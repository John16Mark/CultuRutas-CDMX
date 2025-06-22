# Visitante Registro
DROP PROCEDURE IF EXISTS usuario_registro;
DROP PROCEDURE IF EXISTS usuario_confirmar_correo;
DROP PROCEDURE IF EXISTS UsuarioRegistroGoogle;
DROP PROCEDURE IF EXISTS UsuarioConfirmarCuenta;
DROP PROCEDURE IF EXISTS UsuarioConfirmarCuentaId;
# Visitante Inicio de Sesión
DROP PROCEDURE IF EXISTS usuario_login;
DROP PROCEDURE IF EXISTS UsuarioIniciarSesionGoogle;

DELIMITER //

-- ---------------------------------------------------------------------------------------------------
--                                         USUARIO REGISTRO
-- ---------------------------------------------------------------------------------------------------

-- -----------------------------------------------------
-- Process `CultuRutas`.`usuario_registro`
-- -----------------------------------------------------
CREATE PROCEDURE usuario_registro (
   IN p_correo VARCHAR(320),
   IN p_contraseña VARCHAR(255)
)
BEGIN

   DECLARE usuarioExistente INT;
   DECLARE confirmacionStatus INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Visitante
   WHERE UPPER(correo_electronico) = UPPER(p_correo);
    
   IF usuarioExistente = 0 THEN
      -- Validar formato del correo
      IF p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$' THEN
         INSERT INTO Visitante (correo_electronico, contrasena, fecha_creacion, correo_verificado)
         VALUES (p_correo, p_contraseña, NOW(), 0);
         
         SELECT id_visitante FROM Visitante WHERE correo_electronico = p_correo;
      ELSE
         SELECT 'correo_invalido' AS 'error';
      END IF;
   ELSE
      -- Obtener el valor de confirmacion
      SELECT correo_verificado INTO confirmacionStatus
      FROM Visitante
      WHERE UPPER(correo_electronico) = UPPER(p_correo);

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
CREATE PROCEDURE usuario_confirmar_correo (
   IN p_correo VARCHAR(320)
)
BEGIN
   DECLARE usuarioExistente INT;

   SELECT COUNT(*) INTO usuarioExistente
   FROM Visitante
   WHERE correo_electronico = UPPER(p_correo);
    
   IF usuarioExistente = 0 THEN
      SELECT 'correo_no_registrado' AS 'error';
   ELSE
      UPDATE Visitante SET correo_verificado = 1
      WHERE correo_electronico = UPPER(p_correo);
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
   DECLARE v_contraseña VARCHAR(255);
   DECLARE v_imagen VARCHAR(512);
   DECLARE v_confirmacion BOOLEAN;
   DECLARE v_ultimaConexion DATETIME;
   
   SELECT id_visitante, contrasena, fecha_ultimo_login, correo_verificado
   INTO v_id, v_contraseña, v_ultimaConexion, v_confirmacion
   FROM Visitante
   WHERE correo_electronico = p_correo;
   
   SET correoInvalido = NOT (p_correo REGEXP '^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([\-]?[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,63}$');

   IF correoInvalido THEN
      SELECT 'correo_invalido' AS 'error';
   ELSE
      IF v_id IS NULL THEN
         SELECT 'correo_no_registrado' AS 'error';
      ELSEIF v_confirmacion = 0 THEN
         SELECT 'correo_no_confirmado' AS 'warning';
      ELSE
         SELECT
            v_id AS id_visitante,
            v_contraseña AS contrasena,
            v_ultimaConexion AS fecha_ultimo_login;
      END IF;
   END IF;
END //
