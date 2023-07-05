import { v4 } from 'uuid';
import { NAME_TO_GENERATE_ID } from './constants';

export function idGenerator() {
    return NAME_TO_GENERATE_ID + v4().split("-").pop()
}