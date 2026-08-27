import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const cities = [
    { name: "Cebu City", slug: "cebu-city", region: "Metro Cebu", lat: 10.3167, lon: 123.8907 },
    { name: "Mandaue City", slug: "mandaue", region: "Metro Cebu", lat: 10.32361, lon: 123.92222 },
    { name: "Lapu-Lapu City", slug: "lapu-lapu", region: "Metro Cebu", lat: 10.31028, lon: 123.94944 },
    { name: "Consolacion", slug: "consolacion", region: "Metro Cebu", lat: 10.3766, lon: 123.9573 },
    { name: "Lilo-an", slug: "lilo-an", region: "Metro Cebu", lat: 10.42156, lon: 123.97167 },
    { name: "San Fernando", slug: "san-fernando", region: "Metro Cebu", lat: 10.2, lon: 123.66667 },
    { name: "Talisay City", slug: "talisay", region: "Metro Cebu", lat: 10.3, lon: 123.81667 },
    { name: "Minglanilla", slug: "minglanilla", region: "Metro Cebu", lat: 10.26667, lon: 123.76667 },
    { name: "Naga City", slug: "naga", region: "Metro Cebu", lat: 10.20898, lon: 123.758 },
    { name: "Compostela", slug: "compostela", region: "Metro Cebu", lat: 10.455, lon: 124.0106 },
    { name: "Asturias", slug: "asturias", region: "Northern Cebu", lat: 10.6, lon: 123.81667 },
    { name: "Catmon", slug: "Catmon", region: "Northern Cebu", lat: 10.66667, lon: 123.95 },
    { name: "Borbon", slug: "borbon", region: "Northern Cebu", lat: 10.83333, lon: 124 },
    { name: "Tabuelan", slug: "tabuelan", region: "Northern Cebu", lat: 10.8209, lon: 123.8689 },
    { name: "Medellin", slug: "medellin", region: "Northern Cebu", lat: 11.11667, lon: 123.96667 },
    { name: "Argao", slug: "argao", region: "Southern Cebu", lat: 9.88333, lon: 123.53333 },
    { name: "Oslob", slug: "Oslob", region: "Southern Cebu", lat: 9.51667, lon: 123.4 },
    { name: "Moalboal", slug: "moalboal", region: "Southern Cebu", lat: 9.91667, lon: 123.43333 },
    { name: "Badian", slug: "Badian", region: "Southern Cebu", lat: 9.85, lon: 123.43333 },
    { name: "Sibonga", slug: "sibonga", region: "Southern Cebu", lat: 10.0168, lon: 123.6171 },
];

async function main() {
    for (const city of cities){
        await prisma.city.upsert({
            where: { slug: city.slug },
            update: {},
            create: city,
        });
    }
    console.log(`Seeded ${cities.length} cities.`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());