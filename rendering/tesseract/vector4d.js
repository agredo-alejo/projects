const Vector4d = class {
    constructor(x, y, z, w) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }
    mult(factor) {
        this.x *= factor
        this.y *= factor
        this.z *= factor
        this.w *= factor
    }
}