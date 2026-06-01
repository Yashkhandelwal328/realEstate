import prisma from "./src/lib/db";
async function main() {
  try {
    await prisma.property.create({
      data: {
        title: "Test",
        description: "Test desc",
        location: "Vrindavan",
        price: "100",
        type: "Flats",
        amenities: [],
        dimensions: "2BHK",
        isFeatured: false,
        images: ["test.jpg"],
        gmapsUrl: null,
      }
    });
    console.log("Success");
  } catch (e) {
    console.error(e);
  }
}
main();
