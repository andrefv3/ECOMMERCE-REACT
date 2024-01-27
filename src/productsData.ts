export interface Product {
    id: number;
    reference: string;
    name: string;
    price: number;
    images: Images[];
    sizes: Sizes[];
    colors: Colors[];
    category: Category[];
}

export interface Sizes {
    id: number;
    name: string;
    stockQuantity: number;
}

export interface Colors {
    id: number,
    name: string,
    codeHex: string,
}

export interface Category {
    id: number,
    name: string
}

export interface Images {
    name: string,
    url: string,
    seqNum: number,
    colorId: number
}

const products: Product[] = [
    {
        id: 110111011,
        name: "Sudadera Scarface negra",
        reference: "000/000/001",
        price: 199900,
        sizes: [
            { id: 1, name: "xs", stockQuantity: 10 },
            { id: 2, name: "s", stockQuantity: 10 },
            { id: 3, name: "m", stockQuantity: 10 },
            { id: 4, name: "l", stockQuantity: 10 },
            { id: 5, name: "xl", stockQuantity: 10 }
        ],
        images: [
            { name: "Sudadera Scarface negra", url: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_1.jpg?t=1695631766956&amp;imwidth=750", seqNum: 1, colorId: 1 },
            { name: "Sudadera Scarface negra", url: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_20_8.jpg?t=1695631766957&imwidth=850", seqNum: 2, colorId: 1 },
            { name: "Sudadera Scarface negra", url: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_3_8.jpg?t=1696251815648&imwidth=850", seqNum: 3, colorId: 1 },
            { name: "Sudadera Scarface negra", url: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_5_8.jpg?t=1696251815648&imwidth=850", seqNum: 4, colorId: 1 }
        ],
        colors: [
            { id: 1, name: "Negro", codeHex: "000000" },
            { id: 2, name: "Blanco", codeHex: "FFFFFF" }
        ],
        category: [{ id: 11011, name: "Sudaderas y Hoodies" }]
    },
    {
        id: 123002300,
        name: "Camisa manga larga oxford rayas",
        reference: "000/000/002",
        price: 109900,
        sizes: [
            { id: 1, name: "xs", stockQuantity: 0 },
            { id: 2, name: "s", stockQuantity: 10 },
            { id: 3, name: "m", stockQuantity: 10 },
            { id: 4, name: "l", stockQuantity: 10 },
            { id: 5, name: "xl", stockQuantity: 0 }
        ],
        images: [
            { name: "Camisa manga larga oxford rayas", url: "https://static.bershka.net/4/photos2/2024/V/0/1/p/6164/721/250/3432986c57c5a5e3b29724986674819d-6164721250_2_4_0.jpg?imwidth=850&impolicy=bershka-itxmediumhigh&imformat=chrome", seqNum: 1, colorId: 2 },
            { name: "Camisa manga larga oxford rayas", url: "https://static.bershka.net/4/photos2/2024/V/0/1/p/6164/721/250/14ef4106ca80e7c5eb62657a31370562-6164721250_1_1_0.jpg?imwidth=850&impolicy=bershka-itxmediumhigh&imformat=chrome", seqNum: 2, colorId: 2 },
            { name: "Camisa manga larga oxford rayas", url: "https://static.bershka.net/4/photos2/2024/V/0/1/p/6164/721/250/8bfcc6634c477fcbc37dbf97a0030512-6164721250_2_1_0.jpg?imwidth=850&impolicy=bershka-itxmediumhigh&imformat=chrome", seqNum: 3, colorId: 2 },
            { name: "Camisa manga larga oxford rayas", url: "https://static.bershka.net/4/photos2/2024/V/0/1/p/6164/721/250/50a7072c053f3cd57d52daef364487f9-6164721250_2_2_0.jpg?imwidth=850&impolicy=bershka-itxmediumhigh&imformat=chrome", seqNum: 4, colorId: 2 }
        ],
        colors: [
            { id: 2, name: "Blanco", codeHex: "FFFFFF" }
        ],
        category: [{ id: 12300, name: "Camisetas" }]
    },
    {
        id: 110113011,
        name: "Hoodie Loose Fit",
        reference: "000/000/003",
        price: 84900,
        sizes: [
            { id: 1, name: "xs", stockQuantity: 10 },
            { id: 2, name: "s", stockQuantity: 10 },
            { id: 3, name: "m", stockQuantity: 10 },
            { id: 4, name: "l", stockQuantity: 10 },
            { id: 5, name: "xl", stockQuantity: 10 }
        ],
        images: [
            { name: "Hoodie Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/2815539-600-900?v=638235354321130000&width=600&height=900&aspect=true", seqNum: 1, colorId: 3 },
            { name: "Hoodie Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/2815551-483-725?v=638235354383130000&width=483&height=725&aspect=true", seqNum: 2, colorId: 3 },
            { name: "Hoodie Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/2815552-483-725?v=638235354387330000&width=483&height=725&aspect=true", seqNum: 3, colorId: 3 },
            { name: "Hoodie Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/2815554-483-725?v=638235354396470000&width=483&height=725&aspect=true", seqNum: 4, colorId: 3 }
        ],
        colors: [
            { id: 3, name: "Beige", codeHex: "F6E4D3" }
        ],
        category: [{ id: 11011, name: "Sudaderas y Hoodies" }]
    },
    {
        id: 123004300,
        name: "Camiseta Loose Fit",
        reference: "000/000/004",
        price: 49900,
        sizes: [
            { id: 1, name: "xs", stockQuantity: 0 },
            { id: 2, name: "s", stockQuantity: 10 },
            { id: 3, name: "m", stockQuantity: 10 },
            { id: 4, name: "l", stockQuantity: 10 },
            { id: 5, name: "xl", stockQuantity: 10 }
        ],
        images: [
            { name: "Camiseta Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/3250185-600-900?v=638352868825400000&width=600&height=900&aspect=true", seqNum: 1, colorId: 2 },
            { name: "Camiseta Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/3250183-483-725?v=638352868815700000&width=483&height=725&aspect=true", seqNum: 2, colorId: 2 },
            { name: "Camiseta Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/3250184-483-725?v=638352868821600000&width=483&height=725&aspect=true", seqNum: 3, colorId: 2 },
            { name: "Camiseta Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/3250182-483-725?v=638352868811270000&width=483&height=725&aspect=true", seqNum: 4, colorId: 2 },
            { name: "Camiseta Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/3186249-483-725?v=638328705952830000&width=483&height=725&aspect=true", seqNum: 1, colorId: 1 },
            { name: "Camiseta Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/3186247-483-725?v=638328705942870000&width=483&height=725&aspect=true", seqNum: 2, colorId: 1 },
            { name: "Camiseta Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/3186248-483-725?v=638328705948030000&width=483&height=725&aspect=true", seqNum: 3, colorId: 1 },
            { name: "Camiseta Loose Fit", url: "https://hmcolombia.vtexassets.com/arquivos/ids/3186250-483-725?v=638328705957530000&width=483&height=725&aspect=true", seqNum: 4, colorId: 1 }
        ],
        colors: [
            { id: 2, name: "Blanco", codeHex: "FFFFFF" },
            { id: 1, name: "Negro", codeHex: "000000" }
        ],
        category: [{ id: 12300, name: "Camisetas" }]
    }
];

export default products;