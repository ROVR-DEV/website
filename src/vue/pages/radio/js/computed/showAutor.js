'use strict';

export default function showAutor() {
    return this.radio ? this.radio.curator.name : '';
}