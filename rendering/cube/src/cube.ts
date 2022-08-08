import { fill, grayScaleColor, triangleVector } from "@apjs/dynamic"
import { createVector, sub, Vector } from "@apjs/vector"
import { ctx, project, size } from "./main"

export class Cube {

    x: number
    y: number
    z: number
    position: Vector
    faces: number[][]
    vertices: Vector[]

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
        this.position = createVector(this.x, this.y, this.z)
        this.vertices = []
        this.createVertices()



        this.faces = [
            [0, 1, 2, 3],
            [0, 4, 5, 1],
            [0, 3, 7, 4],
            [3, 2, 6, 7],
            [1, 5, 6, 2],
            [4, 7, 6, 5]
        ]

    }
    createVertices() {
        this.vertices = [
            createVector(this.x - size, this.y - size, this.z - size),
            createVector(this.x + size, this.y - size, this.z - size),
            createVector(this.x + size, this.y + size, this.z - size),
            createVector(this.x - size, this.y + size, this.z - size),
            createVector(this.x - size, this.y - size, this.z + size),
            createVector(this.x + size, this.y - size, this.z + size),
            createVector(this.x + size, this.y + size, this.z + size),
            createVector(this.x - size, this.y + size, this.z + size),
        ]
    }
    draw() {
        let vertices = project(this.vertices)
        for (let i = 0; i < this.faces.length; i++) {
            let face = this.faces[i]

            let p1 = this.vertices[face[0]];
            let p2 = this.vertices[face[1]];
            let p3 = this.vertices[face[2]];

            let v1 = sub(p2, p1)
            let v2 = sub(p3, p1)

            let n = v2.cross(v1)

            if (n.dot(p1) <= 0) {

                triangleVector(
                    ctx,
                    vertices[face[0]],
                    vertices[face[1]],
                    vertices[face[2]]
                )
                fill(ctx, grayScaleColor(200))
                ctx.stroke()

                triangleVector(
                    ctx,
                    vertices[face[0]],
                    vertices[face[3]],
                    vertices[face[2]]
                )
                fill(ctx, grayScaleColor(200))
                ctx.stroke()


            }
        }
    }
    rotateX(angle: number) {
        // let rotationX = [
        //     [1, 0, 0],
        //     [0, cos(angle), -sin(angle)],
        //     [0, sin(angle), cos(angle)]
        // ]

        for (let i = 0; i < this.vertices.length; i++) {

            this.vertices[i].z -= this.z

            this.vertices[i].rotateX(angle)

            this.vertices[i].z += this.z

        }

    }

    rotateY(angle: number) {
        // let rotationY = [
        //     [cos(angle), 0, sin(angle)],
        //     [0, 1, 0],
        //     [-sin(angle), 0, cos(angle)]
        // ]

        for (let i = 0; i < this.vertices.length; i++) {

            this.vertices[i].z -= this.z

            this.vertices[i].rotateY(angle)

            this.vertices[i].z += this.z

        }

    }
}