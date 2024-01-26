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
        id: 110111, 
        reference: "000/000/001", 
        name: "Sudadera Scarface negra", 
        price: 199900, 
        images: [
            {
                name: "Sudadera Scarface negra",
                url: "https://static.pullandbear.net/2/photos//2024/V/0/2/p/8596/516/800/8596516800_2_6_1.jpg?t=1695631766956&amp;imwidth=750", 
                seqNum: 1, 
                colorId: 1
            }
        ], 
        sizes: [
            {
                id: 1,
                name: "xs",
                stockQuantity: 10
            },
            {
                id: 2,
                name: "s",
                stockQuantity: 10
            },
            {
                id: 3,
                name: "m",
                stockQuantity: 10
            },
            {
                id: 4,
                name: "l",
                stockQuantity: 10
            },
            {
                id: 5,
                name: "xl",
                stockQuantity: 10
            }
        ], 
        colors: [
            {
                id: 1,
                name: "Negro",
                codeHex: "000000"
            }
        ],
        category: [
            {
                id: 1,
                name: "Sudaderas"
            }
        ]
    },

    { 
        id: 123002, 
        reference: "000/000/002", 
        name: "Camisa manga larga oxford rayas", 
        price: 109900, 
        images: [
            {
                name: "Camisa manga larga oxford rayas",
                url: "https://static.bershka.net/4/photos2/2023/I/0/2/p/6400/777/250/3c4d2c4b7d13a60cf790ccf390bf001b-6400777250_2_4_0.jpg",
                seqNum: 1, 
                colorId: 2
            }
        ], 
        sizes: [
            {
                id: 1,
                name: "xs",
                stockQuantity: 0
            },
            {
                id: 2,
                name: "s",
                stockQuantity: 10
            },
            {
                id: 3,
                name: "m",
                stockQuantity: 10
            },
            {
                id: 4,
                name: "l",
                stockQuantity: 10
            },
            {
                id: 5,
                name: "xl",
                stockQuantity: 0
            }
        ], 
        colors: [
            {
                id: 2,
                name: "Blanco",
                codeHex: "FFFFFF"
            }
        ],
        category: []
    },

    { 
        id: 110113, 
        reference: "000/000/003", 
        name: "Hoodie Loose Fit", 
        price: 84900, 
        images: [
            {
                name: "Hoodie Loose Fit",
                url: "https://hmcolombia.vtexassets.com/arquivos/ids/2815539-600-900?v=638235354321130000&width=600&height=900&aspect=true",
                seqNum: 1,
                colorId: 2
            }
        ], 
        sizes: [
            {
                id: 1,
                name: "xs",
                stockQuantity: 10
            },
            {
                id: 2,
                name: "s",
                stockQuantity: 10
            },
            {
                id: 3,
                name: "m",
                stockQuantity: 10
            },
            {
                id: 4,
                name: "l",
                stockQuantity: 10
            },
            {
                id: 5,
                name: "xl",
                stockQuantity: 10
            }
        ], 
        colors: [
            {
                id: 3,
                name: "Gris",
                codeHex: "808080"
            }
        ],
        category: []
    },

    { 
        id: 123004, 
        reference: "000/000/004", 
        name: "Camiseta Loose Fit", 
        price: 49900, 
        images: [
            {
                name: "Camiseta Loose Fit",
                url: "https://hmcolombia.vtexassets.com/arquivos/ids/3250185-600-900?v=638352868825400000&width=600&height=900&aspect=true",
                seqNum: 1,
                colorId: 2
            }
        ],
        sizes: [
            {
                id: 1,
                name: "xs",
                stockQuantity: 10
            },
            {
                id: 2,
                name: "s",
                stockQuantity: 10
            },
            {
                id: 3,
                name: "m",
                stockQuantity: 10
            },
            {
                id: 4,
                name: "l",
                stockQuantity: 10
            },
            {
                id: 5,
                name: "xl",
                stockQuantity: 10
            }
        ], 
        colors: [
            {
                id: 2,
                name: "Blanco",
                codeHex: "FFFFFF"
            }
        ],
        category: []
    },
];

export default products;