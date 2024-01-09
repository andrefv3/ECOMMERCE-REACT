import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { useCartContext } from "@/contexts/CartContext";
import { Product } from "@/productsData";

const useWishlist = () => {
    const wishlistData = useSelector(({ wishlistData }: any) => wishlistData);
    const wishlistContext = useWishlistContext();
    const cartContext = useCartContext();
    const wishlistBoxRef = useRef<HTMLDivElement | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<{ [productCode: number]: string }>({});
    const [isDropdownOpen, setIsDropdownOpen] = useState<{ [productCode: number]: boolean }>({});
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);

    const handleSizeChange = (productCode: number, size: string) => {
        setSelectedSizes((prevSelectedSizes) => ({
            ...prevSelectedSizes,
            [productCode]: size,
        }));
    };

    const handleSizeSelection = (productCode: number, size: string) => {
        setSelectedSizes((prevSelectedSizes) => ({
            ...prevSelectedSizes,
            [productCode]: size,
        }));
        setIsDropdownOpen((prevIsDropdownOpen) => ({
            ...prevIsDropdownOpen,
            [productCode]: false,
        }));
    };

    const handleMoveToCart = (product: Product) => {
        const currentSelectedSize = selectedSizes[product.productCode];
        if (currentSelectedSize) {
            wishlistContext.removeFromWishlist(product.productCode);
            cartContext.handleCartClick(product.productCode, currentSelectedSize, 0);
        }
    };

    const handleDropdownEnter = (productCode: number) => {
        if (activeDropdown !== null && activeDropdown !== productCode) {
            setIsDropdownOpen((prevIsDropdownOpen) => ({
                ...prevIsDropdownOpen,
                [activeDropdown]: false,
            }));
        }
        setActiveDropdown(productCode);
        setIsDropdownOpen((prevIsDropdownOpen) => ({
            ...prevIsDropdownOpen,
            [productCode]: true,
        }));
    };

    const handleDropdownLeave = (productCode: number) => {
        if (activeDropdown === productCode) {
            setActiveDropdown(null);
        }
        setIsDropdownOpen((prevIsDropdownOpen) => ({
            ...prevIsDropdownOpen,
            [productCode]: false,
        }));
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (wishlistBoxRef.current && !wishlistBoxRef.current.contains(target)) {
                wishlistContext.closeWishlist();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wishlistContext]);

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        const { updatedSelectedIdx } = wishlistData?.wishlist || {};
            if (Array.isArray(updatedSelectedIdx)) {
            const filtered = wishlistContext.products.filter((product) =>
                updatedSelectedIdx.includes(product.productCode)
            );

            setFilteredProducts(filtered);
        }
    }, [wishlistData, wishlistContext]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return {
        filteredProducts,
        wishlistBoxRef,
        wishlistContext,
        selectedSizes,
        isDropdownOpen,
        hovered,
        setHovered,
        handleSizeSelection,
        handleDropdownEnter,
        handleDropdownLeave,
        setSelectedSizes,
        handleSizeChange,
        handleMoveToCart,
    };
};

export default useWishlist;
