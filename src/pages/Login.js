
import React, {useState}from 'react';
import { KeyboardAvoidingView, Alert, Platform ,StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native'


export default function Login ({ navigation }) {
    const [user, setUser] = useState('');

 async function handleLogin () {
        //const response = await api.post('/users', { username: user })
        navigation.navigate("Main")
    }
  return (
    <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
            <TextInput placeholder="Digite seu username"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setUser}
            style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <Text style={styles.buttontext}>Fazer login</Text>
            </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
/* Password
<TextInput placeholder="Digite sua senha"
            placeholderTextColor="#999"
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            style={styles.input}
            />
*/
const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        padding: 30,
        backgroundColor: '#ccc'
    },
    input:{
        height:46,
        alignSelf: "stretch",
        backgroundColor: "#FFF",
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 10,
        paddingHorizontal: 15,
    },
    button:{
        height:46,
        alignSelf: "stretch",
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    buttontext:{
        color: "#FFF",
        fontWeight: 'bold',
        fontSize: 16
    },
})