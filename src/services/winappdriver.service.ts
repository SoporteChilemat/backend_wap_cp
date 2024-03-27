import { remote, RemoteOptions } from 'webdriverio';

class WinappdriverService {
  private driver: WebdriverIO.Browser | null = null;

  public async precedimiento() {
    const rutaExe = "C:\\Users\\camil\\AppData\\Local\\Apps\\2.0\\QZ8KO7TQ.26W\\5LPEJQ10.XEJ\\busq..tion_0000000000000000_0064.0000_f51df8f7926d45d2\\BusquedaProducto.exe";

    const opciones: RemoteOptions = {
      capabilities: {
        platformName: "Windows",
        deviceName: "WindowsPC",
        app: rutaExe
      },
      port: 4723 // Puerto por defecto de WinAppDriver
    };

    try {
      this.driver = await remote(opciones);
      console.log("Sesión iniciada con éxito en WinAppDriver");
    } catch (error) {
      console.error("Error al iniciar sesión con WinAppDriver", error);
    }
  }

  public async cerrarSesion() {
    if (this.driver) {
      //await this.driver.deleteSession();
      console.log("Sesión cerrada con éxito");
    }
  }
}

export default WinappdriverService;
