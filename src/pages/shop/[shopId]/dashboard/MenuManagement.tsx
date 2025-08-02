import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCloudArrowUp } from "react-icons/fa6";
import { RiCloseCircleFill } from "react-icons/ri";
import { toast } from "sonner";

import { menuApi, menuOptionApi } from "@/Api/menu.api";
import { uploadImageApi } from "@/Api/uploadImage.api";
import { Button } from "@/components/ui/button";
import UploadImage from "@/components/uploadImage";
import useImages from "@/hooks/useImage";
import useShop from "@/hooks/useShop";
import { cn } from "@/lib/utils";
import { schema, type QuickAddMenu } from "@/schema/addMenuSchema";
import { compressAndUpload } from "@/utils/imageCompression";
import { transformKeysToSnakeCase } from "@/utils/string";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function MenuManagement() {
  const menuId = uuidv4();
  /* ---------------- state --------------- */

  const [drafts, setDrafts] = useState<
    { menu: QuickAddMenu; imageFiles?: File[] }[]
  >([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { selectedShop } = useShop();
  const { addImage } = useImages();

  /* ------------ react-hook-form ---------- */
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickAddMenu>({ resolver: zodResolver(schema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  /* ---------- form handlers -------------- */
  const onSubmit = (data: QuickAddMenu) => {
    setDrafts(prev => [...prev, { menu: data, imageFiles: [] }]);
    toast.success("Draft menu added");

    reset();
  };

  const attachImages = (index: number, files: File[]) =>
    setDrafts(prev =>
      prev.map((d, i) =>
        i === index
          ? { ...d, imageFiles: [...(d.imageFiles ?? []), ...files] }
          : d
      )
    );

  /* ------------- save all --------------- */
  const saveAll = async () => {
    if (!selectedShop) return toast.error("Please select a shop first");
    const shopId = selectedShop.id;
    setLoading(true);

    try {
      /* 1️⃣  create menus in parallel */
      const createResults = await Promise.allSettled(
        drafts.map(({ menu }) => {
          return menuApi
            .create({
              id: menuId,
              ...transformKeysToSnakeCase(menu),
              shopId,
            })
            .then(res => ({ id: menuId, result: res, menu }));
        })
      );

      /*  send data menu option */

      for (let i = 0; i < drafts.length; i++) {
        const createResult = createResults[i];
        if (createResult.status !== "fulfilled") continue;

        const { menu } = drafts[i];
        const menuId = createResult.value.id;

        if (menu.options && menu.options.length > 0) {
          await Promise.allSettled(
            menu.options.map(option => {
              menuOptionApi.create({
                ...transformKeysToSnakeCase(option),
                menuId,
              });
            })
          );
        }
      }

      /* 2️⃣  for each draft: fetch menuId then upload ALL image files */
      for (let i = 0; i < drafts.length; i++) {
        const { imageFiles } = drafts[i];

        if (!imageFiles || imageFiles.length === 0) continue;
        const createResult = createResults[i];
        if (createResult.status !== "fulfilled") continue;

        const menuId = createResult.value.id;

        // Upload all images for this menu
        await Promise.all(
          imageFiles.map(file => {
            const previewUrl = URL.createObjectURL(file);

            return compressAndUpload(
              previewUrl,
              (fd: FormData) => uploadImageApi.create(fd).then(r => r.data.url),
              { type: "menu", shopId, menuId }
            );
          })
        );
      }

      toast.success("Menus and images saved!");
      setDrafts([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save some items");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDraft = (idx: number) => {
    setDrafts(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-2">Menu &amp; Promotions</h1>
      <p className="text-gray-600 mb-6">
        Manage your restaurant menu items and special promotions
      </p>

      <Tabs defaultValue="menu">
        <TabsList className="mb-6">
          <TabsTrigger value="menu">Regular Menu</TabsTrigger>
          <TabsTrigger value="desserts">Dessert</TabsTrigger>
          <TabsTrigger value="drinks">Drink</TabsTrigger>
          <TabsTrigger value="promotions">Special</TabsTrigger>
        </TabsList>

        {/* ---------- DRAFT CARDS + UPLOAD ---------- */}
        {drafts.length > 0 && (
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {drafts.map(({ menu }, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col p-4 rounded-2xl shadow-md border bg-white"
                >
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                    <RiCloseCircleFill
                      size={20}
                      onClick={() => handleRemoveDraft(idx)}
                    />
                  </button>
                  <p className="text-lg font-semibold">{menu.name}</p>
                  {menu.options.map((item, index) => (
                    <div key={index} className="">
                      <p>
                        {item.label} - {item.price}
                      </p>
                    </div>
                  ))}
                  <button
                    onClick={() => setUploadingIndex(idx)}
                    className="mt-4 flex items-center gap-1 text-blue-600"
                  >
                    <FaCloudArrowUp size={18} />
                    <span className="text-sm">Upload</span>
                  </button>
                  <UploadImage
                    trigger={uploadingIndex === idx}
                    onDialogClosed={() => setUploadingIndex(null)}
                    onImagesSelected={files => {
                      const fileArray = Array.from(files);
                      fileArray.forEach(file => {
                        addImage({
                          previewUrl: URL.createObjectURL(file),
                          status: "idle",
                          type: "menu",
                          shopId: selectedShop?.id ?? "",
                          menuId: menuId,
                        });
                      });

                      attachImages(idx, fileArray);
                    }}
                    type={"menu"}
                    menuId={""}
                    shopId={""}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                disabled={loading}
                onClick={saveAll}
                className={cn(
                  "px-6 py-2 rounded-full shadow text-white",
                  loading
                    ? "bg-blue-600/40 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {loading ? "Saving…" : "Save All"}
              </Button>
            </div>
          </div>
        )}

        {/* ---------- FORM TAB ---------- */}
        <TabsContent value="menu">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Menu Item</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Item Name
                  </Label>
                  <Input
                    {...register("name")}
                    placeholder="Enter menu name"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                  <Input
                    {...register("price")}
                    placeholder="Enter price"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="flex-col border-5  border-dotted border-gray-200 justify-center rounded-2xl mx-30 my-4 p-5  flex gap-5 ">
                  <h3>Options</h3>
                  {fields.length > 0 && (
                    <div className="space-y-4 ">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-3">
                          <Input
                            {...register(`options.${index}.label`)}
                            placeholder="ex. 3 ชิ้น"
                            className="flex-1 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                          />
                          <Input
                            {...register(`options.${index}.price`)}
                            placeholder="Price"
                            type="number"
                            className="w-24 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                          >
                            ลบ
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    type="button"
                    onClick={() => append({ label: "", price: 0 })}
                    className="  hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Add Option
                  </Button>
                  <Button
                    type="submit"
                    className={cn(
                      "  bg-blue-600  text-white hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-sm ",
                      !selectedShop &&
                        "bg-blue-300 cursor-not-allowed hover:bg-blue-300"
                    )}
                    disabled={!selectedShop}
                  >
                    Add Menu
                  </Button>
                  <div className="hidden">
                    {errors &&
                      errors.options &&
                      toast.error(`${errors.options.message}}`)}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
