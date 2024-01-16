'use strict';

export default function showauthor() {
    return this.radio ? this.radio.curator.name : '';
}