import React from 'react'
import {
    AppRegistry,
    Text,
    View,
    VrButton,
    asset,
} from 'react-360'
import Entity from 'Entity'

export default class ReactVR extends React.Component {
    constructor() {
        super()
        this.state = {
            vrObjects:  {
                translateX: 0,
                translateY: 0,
                translateZ: -10, // Place object in front of us.
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1.5
            }
        }
    }

    componentDidMount() {
        this.rotate()
    }

    rotate = () => {
        const vrObjects = this.state.vrObjects
        if (null!==vrObjects) {
            vrObjects.rotateY = vrObjects.rotateY + 0.1
            this.setState(
                {
                    vrObjects: vrObjects
                }
            )
        }
        requestAnimationFrame(this.rotate)
    }

    setModelStyles = (vrObject, index) => {
        return {
            display: 'flex',
            transform: [
                {
                    translateX: vrObject.translateX
                }, {
                    translateY: vrObject.translateY
                }, {
                    translateZ: vrObject.translateZ
                }, {
                    scale: vrObject.scale
                }, {
                    rotateY: vrObject.rotateY
                }, {
                    rotateX: vrObject.rotateX
                }, {
                    rotateZ: vrObject.rotateZ
                }
            ]
        }
    }

    render() {

        return (
            <View>
                {
                    this.state.vrObjects===null?<Text>Loading...</Text>:<VrButton>
                        <Entity style={this.setModelStyles(this.state.vrObjects)}
                                source={{
                                    obj: asset('car.obj'),
                                    mtl: asset('car.mtl')
                                }}
                        />
                    </VrButton>
                }
            </View>
        )

    }
}


AppRegistry.registerComponent('ReactVR', () => ReactVR)
