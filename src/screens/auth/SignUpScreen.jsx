import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { useSignUpMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../../validations/validationSchema';

const textInputWidth = Dimensions.get('window').width * 0.7

const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [genericValidationError, setGenericValidationError] = useState("")
    const [errorAddUser,setErrorAddUser] = useState(false)

    const [triggerSignUp, result] = useSignUpMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('result',result)
        if (result.status === "rejected") {
            console.log("Error al agregar el usuario", result)
            setErrorAddUser("Ups! No se pudo agregar el usuario")
        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con éxito")
            console.log(result.data)
            dispatch(setUser(result.data))
        }
    }, [result])

    const handleSignUp = async () => {
        try {
          const result = await triggerSignUp({ email, password }).unwrap();
          console.log("Usuario creado con éxito:", result);
          dispatch(setUser(result)); // Almacena los datos del usuario en el estado global
        } catch (error) {
          console.error("Error al crear el usuario:", error);
          setErrorAddUser("No se pudo crear el usuario. Intenta de nuevo.");
        }
      };

    // const onsubmit = () => {
    //     console.log(email,password,confirmPassword)
    //     try {
    //         validationSchema.validateSync({ email, password, confirmPassword })
    //         setErrorEmail("")
    //         setErrorPassword("")
    //         setErrorConfirmPassword("")
    //         triggerSignUp({ email, password })
    //     } catch (error) {
    //         switch (error.path) {
    //             case "email":
    //                 console.log(error.message)
    //                 setErrorEmail(error.message)
    //                 break
    //             case "password":
    //                 console.log(error.message)
    //                 setErrorPassword(error.message)
    //                 break
    //             case "confirmPassword":
    //                 console.log(error.message)
    //                 setErrorConfirmPassword(error.message)
    //                 break
    //             default:
    //                 setGenericValidationError(error.message)
    //                 break
    //         }
    //     }
    // }

    return (
        <LinearGradient
            colors={[colors.acentoAzul, colors.grisClaro]}
            start={{ x: 0, y: 0 }} // esquina superior izquierda
            end={{ x: 1, y: 1 }}   // esquina inferior derecha
            style={styles.gradient}
        >
            <Text style={styles.title}>ProFit</Text>
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                 {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
                 {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={handleSignUp}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>
            {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}
        </LinearGradient>
    )
}

export default SignUpScreen;


const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.verdeNeon,
        fontFamily: "PressStart2P",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: colors.amarillo,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: "#95859E",
        width: textInputWidth,
        color: colors.blanco,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.blanco
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    },
    error: {
        color: colors.naranjaBrillante
      }
})