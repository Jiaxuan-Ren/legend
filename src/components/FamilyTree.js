import React, {
  Component
} from 'react';
import { View, Text } from 'react-native'

export default class FamilyTree extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center' }}>
        <Text>{'Family Tree'}</Text>
      </View>
    )
  }
}