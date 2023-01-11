import React from "react";
import { ColorRing } from 'react-loader-spinner';

const Loader = () =>
(<ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    colors={['#d1ef7e', '#caf04c', '#83ebdb', '#0bd8c7', '#0c96b2']}
/>);

export default Loader;