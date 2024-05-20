const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const category = await prisma.categories.create({
    data: {
      image:
        "https://jlehnhviqykpbhjqjzmp.supabase.co/storage/v1/object/sign/KristShop/Categories/women-western.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLcmlzdFNob3AvQ2F0ZWdvcmllcy93b21lbi13ZXN0ZXJuLnBuZyIsImlhdCI6MTcxNjE5NjQ3NywiZXhwIjoxNzQ3NzMyNDc3fQ.bQRPLfC1EfJO0UgblEX-gpR6KVrCe753M9j41KvymJg&t=2024-05-20T09%3A14%3A36.363Z",
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
