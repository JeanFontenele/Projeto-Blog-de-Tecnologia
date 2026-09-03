import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor, defina a variável MONGODB_URI no arquivo .env.local');
}

// Cria um cache global para reutilizar a conexão no Next.js
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    
    cached.promise = mongoose.connect(MONGODB_URI!).then((m) => {
      console.log('Conectado com sucesso no banco de dados!');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/*
    mongoose.set('strictQuery',true);

    (conexaobanco).then(function(){
        console.log('Conectado com sucesso no banco de dados!');
    }).catch(function(err){
        console.log(err.message);
    });

*/