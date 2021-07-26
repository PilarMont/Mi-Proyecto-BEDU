from flask import Flask, render_template

app = Flask(__name__) #(__name__)Esto es para indicar mas adelante y verificar que estamos trabajando en nuestro archivo inicial. Osea el MAIN
# Ya tengo la variable app que va a servir para poder controlar mi applicacion y desplegarla correctamente

#Para poder ver en un nav web el resultado hago lo siguiente:

"""@app.route("/") #instruccion a modo de decorador definiendo la ruta raiz 
def home():
    return "¡Hola! Bienvenidos a Mareas Coloradas"
@app.route("/contacto")
def contacto():
    return "Deja tus datos para contactarte" """

@app.route("/")
def home():
    return render_template("index.html") #con el metodo render_template("nombde del archivo") le indicamos a flask que busque el archivo en esa carpeta y lo ejecute en la web. Tengo que importar el metodo render_template

@app.route("/contacto")
def contacto():
    return render_template("contacto.html")

@app.route("/registro")
def registro():
    return render_template("register.html")

if __name__ == "__main__": #para comprobar que estamos en el archivo de arranque, el principal
    app.run(debug=True) #Ya está listo el levantamiento de mi app web, ya estoy lista para ver un resultado en el nav web

#En Python un objeto Thread representa una determinada operación que se ejecuta como un subproceso independiente, es decir, representa a un hilo.
#El método start () es iniciar un hilo secundario, el nombre del hilo es el nombre que definimos
#El método run () no inicia un nuevo hilo, solo llama a una función normal en el hilo principal.
#Ahora abro mi terminal y ejecuto el doc .py para verificar que está corriendo con flask y el puerto
#debe de salir "SERVING FLASK APP "NOMBRE DEL DOC" ..modo de depuracion (deboug) off.. Y EL PUERTO http://127.0.0.1:5000/ , si hay la necesidad más adelante puedo cambiar el puerto
#Voy a un navegador a ejecutar el puerto y saldrá NOT FOUND... porque no está configurada mi ruta. 
#Para configurar pongo @app.route("/") para la ruta raiz antes del if
# ya que lo configuro vuelvo a ejecutar python y el doc .py y ya que sale el mensaje comprueboq ue está funcionando mi app en flask
#Cuadno hago un cambio debo de primero detenert con ctrl + c el servidor para no hacerlo mil veces en app.run() pongo deboug=true para indicar que estoy en el proceso de desarrollo y haré varios cambios en el codigo fuento y así se reiniciará automáticamente cada que se guarde código
#Flask utiliza un motor de platinjas jinja2 igual que Django
#Con Jinja2 podemos procesar datos y reutilizar plantillas
