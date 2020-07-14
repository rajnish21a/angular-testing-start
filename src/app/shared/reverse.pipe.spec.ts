import { ReversePipe } from "./reverse.pipe";

describe("Should return reverse of the string",()=>{
  it("Should return reverse of the string",()=>{
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform("hello")).toEqual("olleh");
  })
})