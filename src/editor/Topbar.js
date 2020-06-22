import React, { useState } from 'react';
import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';
import copy from 'copy-to-clipboard';

export const Topbar = ({ onLoadState }) => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();

  const [stateToLoad, setStateToLoad] = useState(null);

  return (
    <div>
      <button
        onClick={() =>
          actions.setOptions((options) => (options.enabled = !options.enabled))
        }
      >
        enable
      </button>
      <button
        onClick={() => {
          const json = query.serialize();
          copy(json);
          // copy(lz.encodeBase64(lz.compress(json)));
          setSnackbarMessage('State copied to clipboard');
        }}
      >
        copy current state
      </button>
      <input
        type="text"
        onChange={(e) => setStateToLoad(e.target.value)}
      ></input>
      <button
        onClick={() => {
          // const json = lz.decompress(lz.decodeBase64(stateToLoad));
          actions.deserialize(stateToLoad);
          console.log('state loaded');
        }}
      >
        fucking load
      </button>
    </div>
  );
};
