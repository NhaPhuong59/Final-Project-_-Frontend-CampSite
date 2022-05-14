import { useRef } from "react";
import isEqual from 'lodash/isEqual';

export default function useEqual(value) {
    const previous = useRef(value)
    if (!isEqual(previous.current, value)) {
        previous.current = value
    }
    return previous.current
}