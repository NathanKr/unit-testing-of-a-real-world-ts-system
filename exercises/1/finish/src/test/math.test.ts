import {expect, test} from 'vitest'
import { add, mul } from '../math'

test('add(1,2) -> 3',()=>{
    expect(add(1,2)).toBe(3)
})


test('mul(2,3) => 6',()=>{
    expect(mul(2,3)).toBe(6)
})