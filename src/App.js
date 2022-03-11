import "./App.css";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Star,
  Group,
  Image as ConvaImage,
  Transformer,
} from "react-konva";
import useImage from "use-image";
import { useState, useRef, useEffect, useCallback } from "react";
import { jsPDF } from "jspdf";
import { BrowserRouter as Router } from "react-router-dom";

import RoutesApp from "./routes";

import {
  Board,
  Container,
  ContainerConva,
  MySquare,
  Image,
  Box,
  Box2,
  FlexButton,
  ButtonSave,
  WrapperContainer,
} from "./styles";

import DarkMagician from "./assets/Dark_Magician.png";
import WhiteDragon from "./assets/white-dragon.jpg";

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  newColorMode,
}) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const [img] = useImage(image.src);

  return (
    <>
      <ConvaImage
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          onChange({
            ...shapeRef.current,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
        image={img}
        ref={shapeRef}
        {...shapeProps}
        x={image.x}
        y={image.y}
        draggable
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 0 || newBox.height < 0) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <RoutesApp />
    </Router>
  );
}

export default App;
