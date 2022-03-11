import React, { useState, useRef, useEffect } from "react";
import { Transformer, Text, Stage, Layer, Group } from "react-konva";
import { Html } from "react-konva-utils";
import { ContainerCanvas, Canvas } from "./styles";
import { TextEditor } from "../../components/TextEditor";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

const template = [
  {
    x: 60,
    y: 18,
    text: "Contrato de Privacidade de Dados",
    fontSize: 29,
    fill: "#000",
    fontStyle: "normal",
    id: "simplasdasseText1",
    object: "simpleText",
    width: 500,
  },
];

const SimpleText = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  const [editorEnabled, setEditorEnabled] = useState(false);
  const [isTransform, setIsTransform] = useState(false);
  const [isCursor, setIsCursor] = useState({});

  useEffect(() => {
    if (isSelected && trRef.current !== null) {
      // we need to attach transformer manually
      trRef.current?.setNodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <Group draggable>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={(e) => {
          const absPosition = e.target.getAbsolutePosition();
          setEditorEnabled(true);
          setIsCursor(absPosition);
          {
            console.log(shapeRef.current.fontSize(), "qual é a fonte?");
          }
        }}
        ref={shapeRef}
        visible={!editorEnabled}
        {...shapeProps}
        draggable={true}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
        perfectDrawEnabled={false}
      />

      {editorEnabled && (
        <Group>
          <TextEditor
            value={shapeProps.text}
            textNodeRef={shapeRef}
            onChange={onChange}
            onBlur={() => {
              setEditorEnabled(false);
            }}
            cursorPosition={isCursor}
          />
        </Group>
      )}

      {isSelected && (
        <Transformer
          rotateEnabled={false}
          flipEnabled={false}
          enabledAnchors={["middle-left", "middle-right"]}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
      )}
    </Group>
  );
};

export default function Home() {
  const [objectScreen, setObjectScreen] = useState(template);
  const [objectSelectId, setObjectSelectId] = useState("");

  // konva stage of deselect when clicked on empty area
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setObjectSelectId(null);
    }
  };

  return (
    <ContainerCanvas>
      <Canvas>
        <Stage
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          width={500}
          height={700}
        >
          <Layer>
            {objectScreen.map((value, index) => (
              <>
                <SimpleText
                  key={value.id}
                  shapeProps={value}
                  isSelected={value.id === objectSelectId}
                  onSelect={() => {
                    setObjectSelectId(value.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = objectScreen.slice();
                    rects[index] = newAttrs;
                    setObjectScreen(rects);
                  }}
                />
              </>
            ))}
          </Layer>
        </Stage>
      </Canvas>
    </ContainerCanvas>
  );
}
