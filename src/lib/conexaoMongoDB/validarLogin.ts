//CONEXÃO COM BANCO DE DADOS MONGODB
'use server'
import mongoose from "mongoose";
import { connectToDatabase } from "./Mongodb";
import { loginSchema } from "./modelLogin";
import { noticiaSchema } from "./modelNoticias";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


//função de validação do login de usuário
export async function validarLogin(formData: FormData) {

    //const Noticias = mongoose.models.Noticias || mongoose.model("Noticias", noticiaSchema);
    const LoginPainel = mongoose.models.LoginPainel || mongoose.model("LoginPainel", loginSchema);

    // 1. Conecta ao MongoDB
    await connectToDatabase();


    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        //redirect('/login?error=dados_incompletos');
        console.log("Dados incompletos!");
        return;
    }


    // 2. Busca o usuário na coleção 'usuarios'
    const usuario:any = await LoginPainel.findOne({ usuario: username }); 

    const user:String = usuario._doc.usuario;
    const senhaUser = usuario._doc.senha;
    
    // 3. Valida se o usuário existe e se a senha confere
    // (Em produção, compare usando bcrypt / argon2)
    if (user != username) {

        console.log("Credenciais inválidas!");

    }else if (user && senhaUser == password) {

        const cookieStore = await cookies();
        cookieStore.set('auth_token', usuario._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 8, // 8 horas
            path: '/',
        });
        console.log("Login efetuado com sucesso!");

        // 5. Redireciona para o painel de notícias
        redirect('/painel?Login='+user);
        
    }
}





//função de cadastro do novo usuario do painel 
export async function cadastrarUsuario(formData: FormData){

    // 1. Conecta ao banco de dados
    await connectToDatabase();
    // 2. Define o Schema e o Model (com proteção contra re-compilação)
    const LoginPainel = mongoose.models.LoginPainel || mongoose.model("LoginPainel", loginSchema);

    let newUsuario = formData.get('newuser') as string;
    let senha = formData.get('password') as string;

    //console.log(novoUsuario+ "   " +senha)

    if (!newUsuario || !senha) {
        //redirect('/login?error=dados_incompletos');
        console.log("Dados incompletos, preencha todos os campos!");
        return;
    }
    //CONTINUAR TRABALHANDO NA QUERY DE BUSCA DE DETERMINADO USUÁRIO
    try {
        // 3. Verifica se o nome de usuário já existe na coleção
        const usuarioExistente = await LoginPainel.findOne({ usuario: newUsuario });
        
        //console.log(usuarioExistente)
        if (usuarioExistente) {
            console.log('Já existe esse nome de usuário cadastrado.');
            return;
        }
       
        // 4. Se não existir, prossegue com a criação e gravação do novo documento
        const novoUsuario = new LoginPainel({
            usuario: newUsuario,
            senha: senha // Nota: Em produção, lembre-se de criptografar com bcryptjs
        });

        await novoUsuario.save();
        console.log('Usuário cadastrado com sucesso!');

    } catch (error) {
        console.log('Erro ao processar o cadastro:', error);
    }

}

//Quando colocar o site no ar é preciso colocar o IP do servidor em "IP acess list" no site do MongoDB.