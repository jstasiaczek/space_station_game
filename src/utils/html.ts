import { h } from 'preact';
import htm from 'htm';

export const getHtml = () => {
    return htm.bind(h);
}