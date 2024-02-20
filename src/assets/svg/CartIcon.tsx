import { useEffect, useState } from "react";
import { svgProps } from "./dto/svg.dto";
import './CartIcon.css'; 
import { useSelector } from "react-redux";

const CartHeart: React.FC<svgProps> = ({ color, width, height, type }) => {
    const [animationSlideOut, setAnimationSlideOut] = useState(false);
    const [fillHeart, setFillHeart] = useState(false);
    const wishlistData = useSelector(({ wishlistData }: any) => wishlistData);
    const { updatedSelectedIdx } = wishlistData.wishlist;

    useEffect(() => {
        if(updatedSelectedIdx.length < 1){
            setAnimationSlideOut(false);
            if (type) {
                setTimeout(() => {
                    setAnimationSlideOut(true);
                    setTimeout(() => {
                        setFillHeart(true);
                    }, 400)
                }, 1000); // Ajusta el tiempo según la duración de la animación SlideOut
            }
        }else if(updatedSelectedIdx.length > 0){
            setFillHeart(true);
        }
    }, [type, wishlistData]);

    return (
        <div id="cartHeart">
            <div className={`carruselCart ${animationSlideOut ? 'SlideOut' : ''}`}>
                <div className={`cart-heart-wrapper`}>
                    <svg 
                        className="LogoColor" 
                        width={width} 
                        height={height} 
                        viewBox="0 0 531.000000 470.000000" 
                        preserveAspectRatio="xMidYMid meet"
                        fill={color} 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g transform="translate(0.000000,470.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
                        {type && wishlistData && fillHeart ? (
                            <path d="M3465 4145 c-27 -6 -59 -15 -70 -19 -73 -30 -95 -41 -95 -48 0 -4 -6 -8 -13 -8 -19 0 -92 -75 -128 -132 -39 -60 -72 -186 -66 -253 7 -77 28 -189 38 -199 5 -6 9 -18 9 -27 0 -10 3 -19 8 -21 4 -1 21 -29 37 -60 37 -72 54 -93 135 -176 82 -84 148 -142 160 -142 6 0 10 -4 10 -8 0 -5 46 -40 103 -78 56 -38 104 -72 105 -76 2 -5 10 -8 18 -8 8 0 14 -4 14 -9 0 -5 8 -12 18 -15 9 -3 33 -19 51 -35 19 -17 49 -38 67 -47 32 -17 32 -17 65 9 19 15 39 31 45 36 6 5 30 21 55 36 24 16 46 31 49 35 3 3 23 17 45 30 95 58 235 169 325 260 75 75 109 119 145 188 17 31 33 59 36 62 13 11 46 154 56 244 5 47 0 73 -34 181 -25 78 -124 205 -160 205 -7 0 -13 4 -13 8 0 5 -19 16 -42 26 -24 10 -52 21 -63 26 -49 21 -141 27 -210 15 -99 -17 -171 -53 -236 -117 -16 -16 -33 -28 -39 -28 -7 0 -26 15 -44 33 -49 50 -162 103 -237 112 -35 3 -71 8 -79 9 -8 2 -37 -2 -65 -9z" fill="#EA335C"/>
                        ): (
                            <path d="M4222 4249 c-61 -12 -145 -52 -197 -94 l-44 -37 -33 25 c-95 71 -211 107 -343 107 -114 -1 -161 -11 -261 -61 -193 -95 -304 -281 -304 -509 1 -184 61 -324 229 -533 148 -183 502 -458 636 -493 117 -32 192 -5 367 130 15 12 48 37 75 56 155 112 310 257 399 377 106 141 174 318 174 450 0 371 -338 653 -698 582z m193 -234 c143 -37 242 -149 268 -302 9 -52 8 -71 -7 -120 -69 -226 -240 -411 -633 -682 l-62 -43 -78 47 c-167 102 -339 248 -453 384 -109 130 -167 246 -176 350 -22 232 174 408 402 361 33 -7 71 -18 85 -26 46 -23 112 -85 157 -145 24 -32 46 -59 49 -59 3 0 44 38 92 84 111 109 134 127 195 148 63 22 86 22 161 3z"/>
                        )}
                        <path d="M2155 4230 c-74 -16 -159 -50 -226 -90 -132 -79 -272 -262 -319 -419 l-16 -56 -225 -5 c-208 -5 -227 -7 -271 -28 -44 -22 -80 -59 -107 -110 -7 -13 -21 -121 -32 -240 -10 -119 -28 -316 -39 -437 -11 -121 -25 -278 -30 -350 -6 -71 -17 -195 -25 -275 -7 -80 -17 -183 -20 -230 -4 -47 -15 -175 -25 -285 -10 -110 -21 -238 -25 -285 -3 -47 -16 -179 -27 -295 -11 -116 -21 -266 -22 -335 -1 -125 -1 -125 31 -170 19 -28 51 -56 81 -73 l49 -27 1383 0 1382 0 51 27 c29 16 63 45 79 68 50 72 51 93 8 620 -11 138 -24 322 -30 410 -6 88 -13 176 -15 195 -3 19 -12 141 -20 270 -24 360 -17 331 -84 365 -31 16 -92 53 -135 82 -44 29 -80 52 -82 51 -3 -3 21 -367 35 -538 6 -63 13 -158 16 -210 3 -52 15 -201 25 -330 10 -129 22 -278 25 -330 3 -52 10 -149 16 -215 5 -66 10 -137 12 -158 l2 -38 -1284 -3 -1284 -3 7 71 c4 39 13 152 21 251 8 99 21 248 29 330 8 83 17 186 21 230 3 44 15 177 25 295 43 464 62 682 75 845 19 234 46 535 51 563 4 22 6 22 184 22 l180 0 0 -166 c0 -165 0 -166 -27 -198 -37 -44 -53 -88 -53 -146 0 -221 285 -304 396 -115 49 84 44 160 -16 251 l-39 59 0 158 0 157 382 -2 382 -3 3 -180 c2 -145 -1 -185 -13 -205 -40 -68 -55 -109 -55 -153 -1 -192 228 -286 355 -146 45 50 55 76 55 146 0 62 -29 136 -61 156 -17 11 -19 26 -19 164 0 138 -3 162 -31 270 -30 110 -32 130 -33 298 -1 207 3 193 -100 303 -74 77 -174 141 -272 172 -77 25 -232 35 -299 20z m215 -276 c91 -27 158 -79 221 -172 17 -26 38 -64 45 -84 l13 -38 -389 0 -389 0 22 48 c93 200 290 302 477 246z"/>
                        </g>
                    </svg>
                </div>

                <div className={`heart`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={width-4} height={height} viewBox="0 0 1172 1038" fill="none">
                    <g clipPath="url(#clip0_500_2)">
                    <path d="M856.314 120.178V125.355H871.232H886.149V130.533V135.71H901.067H915.985V140.241C915.985 144.642 916.114 144.771 921.173 144.771H926.362V149.949V155.126H936.091H945.82V160.304V165.482H951.008H956.197V170.659V175.837H961.386C966.445 175.837 966.575 175.966 966.575 180.367C966.575 184.768 966.704 184.898 971.763 184.898H976.952V190.075C976.952 195.123 977.082 195.253 981.492 195.253C985.903 195.253 986.032 195.382 986.032 200.43V205.608H991.221H996.41V210.915V216.222L1001.6 215.704L1006.79 215.187V225.283V235.379H1011.98C1017.04 235.379 1017.16 235.509 1017.16 239.91C1017.16 244.181 1017.42 244.44 1021.7 244.44H1026.25V259.973V275.506H1031.43H1036.62V290.391V305.277H1041.81H1047V385.53V465.782H1041.81H1036.62V485.198V504.614H1031.43H1026.25V514.97V525.325H1021.7H1017.16V535.033V544.741H1011.98H1006.79V555.096V565.451H1001.6H996.41V575.159V584.867H991.221H986.032V590.045C986.032 595.093 985.903 595.222 981.492 595.222H976.952V604.93V614.638H971.763H966.575V619.816V624.994H961.386H956.197V630.171C956.197 635.219 956.067 635.349 951.657 635.349H947.117V645.057V654.765H941.928H936.739V659.942V665.12H931.551C926.492 665.12 926.362 665.249 926.362 669.65C926.362 673.922 926.103 674.181 921.822 674.181C917.411 674.181 917.282 674.31 917.282 679.358C917.282 684.536 917.282 684.536 912.223 684.536C907.164 684.536 907.034 684.665 906.645 689.325C906.256 693.985 905.996 694.244 901.326 694.632C896.656 695.021 896.527 695.28 896.527 699.81V704.729L891.338 704.211L886.149 703.693V709C886.149 714.178 886.02 714.307 881.739 714.307C877.458 714.307 877.199 714.566 876.81 719.096L876.42 724.015L866.302 724.404L856.314 724.792V729.84C856.314 734.888 856.184 735.018 851.774 735.018C847.493 735.018 847.234 735.276 847.234 739.548C847.234 743.949 847.104 744.078 842.045 744.078H836.856V749.256V754.434H831.668H826.479V759.611V764.789H816.75H807.021V769.319C807.021 773.72 806.891 773.85 801.832 773.85H796.644V779.027V784.205H791.455C786.396 784.205 786.266 784.334 786.266 788.606V793.007L776.537 793.913L766.808 794.819V799.867C766.808 804.915 766.808 804.915 761.62 804.915C756.561 804.915 756.431 805.045 756.431 809.446V813.976H746.702H736.973V819.154V824.331H731.785H726.596V829.509V834.686H716.867H707.138V839.217C707.138 843.618 707.008 843.747 701.949 843.747H696.761V848.925V854.102H687.032H677.303V859.28V864.458H672.114C667.055 864.458 666.925 864.587 666.925 868.988V873.518H657.196H647.468V878.696V883.874H642.279H637.09V889.051V894.229H631.901H626.713V899.536C626.713 902.772 626.194 904.455 625.416 903.937C624.637 903.419 620.227 903.548 615.687 903.937L607.255 904.843V909.244C607.255 913.515 607.125 913.645 602.066 913.645H596.877V918.822V924H586.5H576.123V918.822V913.645H570.934C565.875 913.645 565.745 913.515 565.745 909.244V904.843L556.016 903.937L546.287 903.031V898.63C546.287 894.358 546.158 894.229 541.099 894.229H535.91V889.051V883.874H530.721H525.532V878.696V873.518H515.804H506.075V868.988C506.075 864.587 505.945 864.458 500.886 864.458H495.697V859.28V854.102H485.968H476.239V848.925V843.747H471.051C465.992 843.747 465.862 843.618 465.862 839.217V834.686H456.133H446.404V829.509V824.331H441.216H436.027V819.154V813.976H426.298H416.569V809.446C416.569 805.045 416.439 804.915 411.38 804.915H406.192V799.738V794.56H396.463H386.734V789.382V784.205H381.545H376.356V779.027V773.85H371.168C366.109 773.85 365.979 773.72 365.979 769.319V764.789H356.25H346.521V759.611V754.434H341.332H336.144V749.256V744.078H330.955C325.896 744.078 325.766 743.949 325.766 739.548C325.766 735.276 325.507 735.018 321.226 735.018C316.816 735.018 316.686 734.888 316.686 729.84V724.792L306.568 724.404L296.58 724.015L296.19 719.096C295.801 714.566 295.542 714.307 291.261 714.307C286.98 714.307 286.851 714.178 286.851 709.13V703.952H281.662C276.603 703.952 276.473 703.823 276.473 699.551C276.473 695.28 276.214 695.021 271.544 694.632C267.004 694.244 266.744 693.985 266.355 689.325C265.966 684.665 265.707 684.536 261.167 684.536H256.237L256.756 679.358L257.275 674.181H251.957C246.768 674.181 246.638 674.051 246.638 669.65C246.638 665.249 246.508 665.12 241.449 665.12H236.261V659.942V654.765H231.072H225.883V645.057V635.349H221.343C216.933 635.349 216.803 635.219 216.803 630.171V624.994H211.614H206.425V619.816V614.638H201.237H196.048V604.93V595.222H191.508C187.097 595.222 186.968 595.093 186.968 590.045V584.867H181.779H176.59V575.289V565.581L171.661 565.192L166.861 564.804L166.472 554.708L166.083 544.741H161.024H155.835V535.033V525.325H151.295H146.755V514.97V504.614H141.566H136.378V485.198V465.782H131.189H126V385.53V305.277H131.189H136.378V290.391V275.506H141.566H146.755V265.15V254.795H151.295H155.835V245.087V235.379H161.024H166.213V225.283V215.187L171.401 215.704L176.59 216.222V210.915V205.608H181.779H186.968V200.43C186.968 195.382 187.097 195.253 191.508 195.253C195.918 195.253 196.048 195.123 196.048 190.075V184.898H201.237C206.296 184.898 206.425 184.768 206.425 180.367C206.425 175.966 206.555 175.837 211.614 175.837H216.803V170.659C216.803 165.611 216.933 165.482 221.343 165.482C225.753 165.482 225.883 165.352 225.883 160.304V155.126H236.261H246.638V149.949V144.771H251.827C256.886 144.771 257.016 144.642 257.016 140.241V135.71H271.933H286.851V130.533V125.355H301.768H316.686V120.178V115H386.734H456.782V120.178V125.355H471.699H486.617V130.533V135.71H496.994H507.372V140.241V144.771H517.101H526.83V149.949V155.126H536.948H547.066L546.547 160.304L546.028 165.482H551.346H556.665V170.659V175.837H561.854C566.913 175.837 567.042 175.966 567.042 180.367C567.042 184.768 567.172 184.898 572.231 184.898H577.42V190.075V195.253H586.5H595.58V190.075V184.898H600.769C605.828 184.898 605.958 184.768 605.958 180.367C605.958 175.966 606.087 175.837 611.146 175.837H616.335V170.659C616.335 165.611 616.465 165.482 620.875 165.482C625.286 165.482 625.416 165.352 625.416 160.304V155.126H635.793H646.17V149.949V144.771H655.899H665.628V140.241V135.71H676.006H686.383V130.533V125.355H701.301H716.218V120.178V115H786.266H856.314V120.178Z" fill="#EA335C"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_500_2">
                    <rect width="1172" height="1038" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default CartHeart;