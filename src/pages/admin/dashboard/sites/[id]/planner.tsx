import { InputGroup, Checkbox, Button } from 'oah-ui';
import { Card, CardBody, CardHeader, CardFooter } from 'oah-ui';
import React, { useContext, useState } from 'react';
import { LayoutContext } from 'layouts/Admin';
import Link from 'next/link';
import { Container, Row, Col } from 'oah-ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import dynamic from 'next/dynamic';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  boxShadow: '0 0.5rem 1rem 0 rgba(44,51,73,0.1)',
  borderRadius: '5px',
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : '#edf1f7',
  padding: grid,
  width: 250,
});

function QuoteApp() {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  const generateWebsite = () => {
    let pages = [];
    for (let index = 0; index < state.length; index++) {
      const pageSections = state[index];
      let page = {};
      if (index != 0) {
        page = {
          ROOT: {
            type: {
              resolvedName: 'Container',
            },
            isCanvas: true,
            props: {
              background: '#eeeeee',
              padding: 5,
            },
            displayName: 'ie',
            custom: {},
            hidden: false,
            nodes: [],
          },
        };
        if (pageSections && pageSections.length > 0) {
          for (let index = 0; index < pageSections.length; index++) {
            let section;

            if (Math.random() > 0.5) {
              section = 'AgencyBannerSection';
            } else {
              section = 'InteriorBanner';
            }
            const id = `section-${Math.floor(Math.random() * 100).toString()}`;
            page['ROOT'].nodes.push(id);
            page[id] = {
              type: {
                resolvedName: section,
              },
              props: {
                text: 'Click me',
                size: 'small',
              },
              displayName: section,
              custom: {},
              hidden: false,
              parent: 'ROOT',
            };
          }
        }
        pages.push(page);
      }
    }
    console.log(JSON.stringify(pages[0]));
  };

  return (
    <div>
      {/* <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button> */}
      <Button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add New Page
      </Button>
      &nbsp;
      <Button type="button" onClick={generateWebsite}>
        Print
      </Button>
      <br />
      <br />
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                            }}
                          >
                            {item.content}

                            {ind != 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newState = [...state];
                                  newState[ind].splice(index, 1);
                                  setState(
                                    newState.filter((group) => group.length)
                                  );
                                }}
                              >
                                delete
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default QuoteApp;
