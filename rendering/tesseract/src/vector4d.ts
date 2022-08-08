export class Vector4d {

    x: number
    y: number
    z: number
    w: number

    constructor(x:number, y:number, z:number, w:number) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }
    mult(factor: number) {
        this.x *= factor
        this.y *= factor
        this.z *= factor
        this.w *= factor
    }
}