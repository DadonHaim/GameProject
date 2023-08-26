// ------imports----------------------------------------------------------------
    //interfaces:
        import  "./interfaces/IStore";    
        import  "./interfaces/IActions";
        import  "./interfaces/IProps"

    //Libs:
        import _React from "react";

    //global:
        import global from "./Global";

    //classes:

    //function:
        import Http from "./functions/http";

    //store:
        import { UseSelector } from "react-redux/es/hooks/useSelector";
        import myStore from "./store/store";
        import {useDispatch as _useDispatch,useSelector} from "react-redux";
        import allAction from "./store/importAll";


    //basic components:
        import _Button from "./Basic/Button";
        import _Div from "./Basic/Div";
        import _Flex from "./Basic/Flex";
        import _Grid from "./Basic/Grid";
        import _Link from "./Basic/Link";
        import _Text from "./Basic/Text";


// -------exports---------------------------------------------------------------
    //hooks react:
        export const useState    =  _React.useState;
        export const useEffect   =  _React.useEffect;
        export const selector    =  useSelector;
        export const useDispatch =  _useDispatch;

    //global:
        export const GlobalStyle =  global.GlobalStyle;
        export const Global      =  global.Global;

    //classes:

    //function:
        export const Get         =  Http.Get;
        export const Post        =  Http.Post;

    //store:
        export const Action      = allAction;
        export const Store       = myStore;


    //basic components:    
        export const Button      = _Button;
        export const Div         = _Div;
        export const Flex        = _Flex;
        export const Grid        = _Grid;
        export const Link        = _Link;
        export const Text        = _Text;

