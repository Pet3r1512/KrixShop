const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const category = await prisma.categories.create({
    data: {
      image:
        "https://jlehnhviqykpbhjqjzmp.supabase.co/storage/v1/object/sign/KristShop/Categories/women-western.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLcmlzdFNob3AvQ2F0ZWdvcmllcy93b21lbi13ZXN0ZXJuLmpwZyIsImlhdCI6MTcxNjA0MDkwOCwiZXhwIjoxNzQ3NTc2OTA4fQ.H3ZjW_5sF0_mAM3II5ZKqN0gRhEm3jCsZiDSoVz9Q70&t=2024-05-18T14%3A01%3A42.461Z",
      name: "Women-Western",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
