class ActivationFunction {
    constructor(func, dfunc) {
        this.func = func
        this.dfunc = dfunc
    }
    serialize() {
        return JSON.stringify(this);
    }
}
let sigmoid = new ActivationFunction(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
)

let tanh = new ActivationFunction(
    x => Math.tanh(x),
    y => 1 - (y * y)
)
let softplus = new ActivationFunction(
    x => Math.log(1 + Math.pow(Math.E, x)),
    y => 1 / (1 + Math.pow(Math.E, -y))
)
let relu = new ActivationFunction(
    x => Math.max(0, x),
    y => Math.max(0, y) > 0 ? 1 : 0
)
let noActivation = new ActivationFunction(
    x => x,
    y => 1
)
class NeuralNetwork {
    constructor(input) {
        this.inputShapes = []
        this.layers = []
        this.weights = []
        this.bias = []
        this.activationFunction = []
        this.learningRate = 0.1

        if (input instanceof NeuralNetwork || input instanceof Object) {
            this.inputShapes = input.inputShapes.slice()
            this.layers = input.layers.slice()
            this.activationFunction = input.activationFunction.slice()
            this.learningRate = input.learningRate
            this.weights = []
            for (let i = 0; i < input.weights.length; i++) {
                this.weights[i] = Matrix.fromArray(input.weights[i].data)
            }
            this.bias = []
            for (let i = 0; i < input.bias.length; i++) {
                this.bias[i] = Matrix.fromArray(input.bias[i].data)
            }
        }
    }
    setLearningRate(learningRate) {
        this.learningRate = learningRate
    }
    addLayer(object) {
        if (this.layers[0] == undefined) {
            this.inputShapes.push(object.inputShape)
        } 
        if(object.inputShape == undefined) {
            object.inputShape = this.inputShapes[this.layers.length]
        }
        if (object.activation !== undefined) {
            this.activationFunction.push(object.activation)
        }
        else {
            this.activationFunction.push(noActivation)
        }
        this.inputShapes.push(object.units)
        this.layers.push(object.units)
 

        this.weights.push(new Matrix(object.units, object.inputShape))
        this.weights[this.weights.length - 1].randomize()

  
        this.bias.push(new Matrix(object.units, 1))
        this.bias[this.bias.length - 1].randomize()
        
    }
    predict(input) {
        return this.internPredict(input, this.layers.length)
    }
    internPredict(input, iterations) {
        let output = input
        for (let i = 0; i < iterations; i++) {
            output = Matrix.mult(this.weights[i], output)
            output.add(this.bias[i])
            output.map(this.activationFunction[i].func)
        }
        return output
    }
    train(input, target) {
        let output = this.predict(input)
        let targets = target
        // Calculate the error
        let errors = Matrix.sub(targets, output)
        for (let i = this.layers.length - 1; i >= 0; i--) {
            // Calculate gradients
            let gradient = Matrix.map(output, this.activationFunction[i].dfunc)
            gradient.multiply(errors)
            gradient.multiply(this.learningRate)

            // Calculate deltas 
            output = this.internPredict(input, i)
            let lastLayerTransposed = Matrix.transpose(output)
            let weightDeltas = Matrix.mult(gradient, lastLayerTransposed)

            // Adjust weights and bias!!!
            this.weights[i].add(weightDeltas)
            this.bias[i].add(gradient)

            // Calculate the error of previous layers
            let transposedWeights = Matrix.transpose(this.weights[i])
            errors = Matrix.mult(transposedWeights, errors)
        }
    }
    mutate(mutationRate, mutation) {

        if (Math.random() < mutationRate) {
            if (Math.random() > 0.5) {
                let randomWeight = this.weights[Math.floor(Math.random() * this.weights.length)]
                let indexRows = Math.floor(Math.random() * randomWeight.rows)
                let indexCols = Math.floor(Math.random() * randomWeight.cols)
                randomWeight.data[indexRows][indexCols] += mutation
            }
            else {
                let randomBias = this.bias[Math.floor(Math.random() * this.bias.length)]
                let indexRows = Math.floor(Math.random() * randomBias.rows)
                let indexCols = Math.floor(Math.random() * randomBias.cols)
                randomBias.data[indexRows][indexCols] += mutation
            }
        }

    }
    getWeights(){
        let newWeights = []
            for (let i = 0; i < this.weights.length; i++) {
                newWeights[i] = []
                for(let j = 0; j < this.weights[i].data.length; j++){
                    newWeights[i][j] = this.weights[i].data[j].slice()
                }
            }
        return newWeights
    }
    getBias() {
        let newBias = []
        for (let i = 0; i < this.bias.length; i++) {
            newBias[i] = []
            for (let j = 0; j < this.bias[i].data.length; j++) {
                newBias[i][j] = this.bias[i].data[j].slice()
            }
        }
        return newBias
    }
    serialize() {
        return JSON.stringify(this)
    }

    static deserialize(data) {
        if (typeof data == 'string') {
            data = JSON.parse(data)
        }
        return new NeuralNetwork(data)
    }
    copy() {
        return new NeuralNetwork(this)
    }
}
