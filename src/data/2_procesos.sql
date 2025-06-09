# Usuario Registro
DROP PROCEDURE IF EXISTS usuario_registro;
DROP PROCEDURE IF EXISTS UsuarioConfirmarCorreo;
DROP PROCEDURE IF EXISTS UsuarioRegistroGoogle;
DROP PROCEDURE IF EXISTS UsuarioConfirmarCuenta;
DROP PROCEDURE IF EXISTS UsuarioConfirmarCuentaId;
# Usuario Inicio de Sesión
DROP PROCEDURE IF EXISTS usuario_login;
DROP PROCEDURE IF EXISTS UsuarioIniciarSesionGoogle;

DELIMITER //

-- ---------------------------------------------------------------------------------------------------
--                                         USUARIO REGISTRO
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Process `CultuRutasCDMX`.`usuario_registro`
-- -----------------------------------------------------
CREATE PROCEDURE usuario_registro (
   IN p_correo VARCHAR(320),
   IN p_contraseña VARCHAR(255)
)
BEGIN

   DECLARE usuarioExistente INT;
   DECLARE confirmacionStatus INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE UPPER(correo) = UPPER(p_correo);
    
   IF usuarioExistente = 0 THEN
      -- Validar formato del correo
      IF p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$' THEN
         INSERT INTO Usuario (username, correo, contraseña, auditoria, confirmacion)
         VALUES ('', p_correo, p_contraseña, NOW(), 0);
         
         SELECT id FROM Usuario WHERE correo = p_correo;
      ELSE
         SELECT 'correo_invalido' AS 'error';
      END IF;
   ELSE
      -- Obtener el valor de confirmacion
      SELECT confirmacion INTO confirmacionStatus
      FROM Usuario
      WHERE UPPER(correo) = UPPER(p_correo);

      -- Verificar el estado de confirmacion
      IF confirmacionStatus = 0 THEN
         SELECT 'sin_confirmacion' AS 'warning';
      ELSE
         SELECT 'correo_ya_registrado' AS 'error';
      END IF;
   END IF;
   
END //

-- -----------------------------------------------------
-- Process `CultuRutasCDMX`.`UsuarioConfirmarCorreo`
-- -----------------------------------------------------
CREATE PROCEDURE UsuarioConfirmarCorreo (
   IN p_correo VARCHAR(320)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Usuario
   WHERE correo = UPPER(p_correo);
    
   IF usuarioExistente = 0 THEN
      SELECT 'correo_no_registrado' AS 'error';
   ELSE
      UPDATE Usuario SET confirmacion = 1
      WHERE correo = UPPER(p_correo);
   END IF;
END //

-- ---------------------------------------------------------------------------------------------------
--                                        USUARIO INICIAR SESIÓN
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Process `CultuRutasCDMX`.`usuario_login`
-- -----------------------------------------------------
CREATE PROCEDURE usuario_login (
   IN p_correo VARCHAR(320)
)
BEGIN
   DECLARE correoInvalido BOOLEAN;
   DECLARE v_id INT;
   DECLARE v_username VARCHAR(60);
   DECLARE v_nombre VARCHAR(60);
   DECLARE v_apellido VARCHAR(60);
   DECLARE v_contraseña VARCHAR(255);
   DECLARE v_imagen VARCHAR(512);
   DECLARE v_confirmacion BOOLEAN;
   DECLARE v_ultimaConexion DATETIME;
   
   SELECT id, username, nombre, apellido, contraseña, ligaFotoPerfil, ultimaConexion, confirmacion
   INTO v_id, v_username, v_nombre, v_apellido, v_contraseña, v_imagen, v_ultimaConexion, v_confirmacion
   FROM Usuario
   WHERE correo = p_correo;
   
   SET correoInvalido = NOT (p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$');

   IF correoInvalido THEN
      SELECT 'correo_invalido' AS 'error';
   ELSE
      IF v_id IS NULL THEN
         SELECT 'correo_no_registrado' AS 'error';
      ELSEIF v_confirmacion = 0 THEN
         SELECT 'correo_no_confirmado' AS 'error';
      ELSE
         SELECT
            v_id AS id,
            v_username AS username,
            v_nombre AS nombre,
            v_apellido AS apellido,
            v_contraseña AS contraseña,
            v_imagen AS imagen,
            v_ultimaConexion AS ultimaConexion,
            v_confirmacion AS confirmacion;
      END IF;
   END IF;
END //
