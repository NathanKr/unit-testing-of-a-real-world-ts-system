import { add, getPosts } from "../src/lib/utils/dispatched-functions";
import axios from 'axios'

test('pass wrong n1 -> res.status is failure , error is correct',async ()=>{
    const res = await add({n11:2,n2:3});
    expect(res.status).toBe('failure');
    expect(res.error).toContain('validation')
})

test('pass wrong n2 -> res.status is failure , error is correct',async ()=>{
    const res = await add({n1:2,n22:3});
    expect(res.status).toBe('failure');
    expect(res.error).toContain('validation')
})

test('pass wrong n1 type -> res.status is failure , error is correct',async ()=>{
    const res = await add({n1:true,n2:3});
    expect(res.status).toBe('failure');
    expect(res.error).toContain('validation')
})

test('pass wrong n2 type -> res.status is failure , error is correct',async ()=>{
    const res = await add({n1:1,n2:true});
    expect(res.status).toBe('failure');
    expect(res.error).toContain('validation')
})

test('add(2,3) is success and 5 , error falsy',async ()=>{
    const res = await add({n1:2,n2:3});
    expect(res.result).toBe(5);
    expect(res.status).toBe('success')
    expect(res.error).toBeFalsy()
})

test('getPosts success -> result is 100 , status suceess , error falsy',async ()=>{
    const res = await getPosts(null);
    expect(res.error).toBeFalsy() 
    expect(res.result).toBe(100);
    expect(res.status).toBe('success')
},10000)  

test('getPosts failure -> status is failure',async ()=>{
    axios.get = jest.fn(() => Promise.reject('some error'))
    const res = await getPosts(null);
    expect(res.status).toBe('failure')
    expect(res.error).toBe('some error')
})