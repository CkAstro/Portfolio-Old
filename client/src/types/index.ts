// useSquares
export interface SquareSize {
   square: number;
   gap: number;
   border: number;
   mainText: string;
   subText: string;
   subMargin: number;
}

export interface NucleoProp {
   element: string;
   isotope: number;
   proton: number;
   stable: boolean;
}

export interface NucleoSquare {
   row: number;
   col: number;
   props: NucleoProp;
}

export interface NucleoElement {
   element: string;
   isotopes: Array<number>;
   stable: Array<number>;
   exclude?: Array<number>;
}

export interface Squares {
   squares: Array<NucleoSquare>;
   squareSize: SquareSize;
}

// useMousePosition
export interface MousePosition {
   x: number;
   y: number;
   isActive: boolean;
}

export interface Mouse {
   mousePosition: MousePosition;
}

// useDisplay
type DisplayIdType = JSX.Element | string | null;

export interface Display {
   isEnabled: { id: DisplayIdType };
   enableItem: (val: DisplayIdType) => void;
}

// useModal
export type ModalContent = Array<JSX.Element | null>;

export interface ModalProps {
   content: ModalContent;
   isActive: boolean;
   page: number;
}

export interface Modal {
   modalProps: ModalProps;
   setModalContent: (val: ModalContent) => void;
   toNextPage: () => void;
   toPrevPage: () => void;
   closeModal: () => void;
}

// ClusterItem
export interface ClusterItemProps {
   title: JSX.Element | string;
   components: string;
   image: any;
   description: JSX.Element | string;
   pages: ModalContent;
}

export interface ClusterItemInfo {
   info: ClusterItemProps;
}

// Projects
export interface Point {
   x: number;
   y: number;
}

// WebGL stuff
export interface ShaderProgram {
   program: any;
   attribLocations: {
      vertexPosition: any;
   };
   uniformLocations: {
      projectionMatrix: any;
      modelViewMatrix: any;
      resolution: any;
      volumeData: any;
      colormap: any;
      eyePos: any;
      hideCSM?: any;
      nu?: any;
   };
}
