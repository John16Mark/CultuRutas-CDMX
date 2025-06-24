-- En MySQL o en tu archivo 2_procesos.sql
DELIMITER //
CREATE PROCEDURE visitante_registro (
   IN p_correo VARCHAR(320),
   IN p_contrasena VARCHAR(100),
   IN p_token VARCHAR(64)
)
BEGIN
   DECLARE existente INT;

   SELECT COUNT(*) INTO existente
   FROM Visitante
   WHERE correo_electronico = p_correo;

   IF existente = 0 THEN
      INSERT INTO Visitante (
        correo_electronico, contrasena, correo_verificado, token_verificacion
      )
      VALUES (
        p_correo, p_contrasena, FALSE, p_token
      );

      SELECT 'registro_exitoso' AS 'success';
   ELSE
      SELECT 'correo_ya_registrado' AS ERROR;
   END IF;
END //
DELIMITER ;




DELIMITER //
CREATE PROCEDURE visitante_login (
   IN p_correo VARCHAR(320)
)
BEGIN
   DECLARE v_id INT;
   DECLARE v_contrasena VARCHAR(100);
   DECLARE v_correo_verificado BOOLEAN;
   DECLARE v_token VARCHAR(64);
   DECLARE v_fecha_creacion TIMESTAMP;

   SELECT id_visitante, contrasena, correo_verificado, token_verificacion, fecha_creacion
   INTO v_id, v_contrasena, v_correo_verificado, v_token, v_fecha_creacion
   FROM Visitante
   WHERE correo_electronico = p_correo;

   IF v_id IS NULL THEN
      SELECT 'correo_no_registrado' AS ERROR;
   ELSE
      SELECT
         v_id AS id,
         v_contrasena AS contrasena,
         v_correo_verificado AS correo_verificado,
         v_token AS token,
         v_fecha_creacion AS fecha_creacion;
   END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE gestor_login (
   IN p_correo VARCHAR(320)
)
BEGIN
   DECLARE v_id INT;
   DECLARE v_contrasena VARCHAR(100);
   DECLARE v_correo_verificado BOOLEAN;
   DECLARE v_token VARCHAR(64);
   DECLARE v_fecha_creacion TIMESTAMP;

   SELECT id_gestor, contrasena, correo_verificado, token_verificacion, fecha_creacion
   INTO v_id, v_contrasena, v_correo_verificado, v_token, v_fecha_creacion
   FROM Gestor
   WHERE correo_electronico = p_correo;

   IF v_id IS NULL THEN
      SELECT 'correo_no_registrado' AS error;
   ELSE
      SELECT
         v_id AS id,
         v_contrasena AS contrasena,
         v_correo_verificado AS correo_verificado,
         v_token AS token,
         v_fecha_creacion AS fecha_creacion;
   END IF;
END //
DELIMITER ;

-- Nuevo procedimiento para obtener sitios de un gestor
DELIMITER //
CREATE PROCEDURE obtener_sitios_gestor (
   IN p_id_gestor INT
)
BEGIN
   SELECT * FROM Sitio_turistico_historico
   WHERE id_gestor = p_id_gestor;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE generar_token_recuperacion (
    IN p_correo VARCHAR(320),
    IN p_tipo_usuario ENUM('gestor', 'visitante')
)
BEGIN
    DECLARE v_id INT;
    DECLARE token_generado VARCHAR(64);

    IF p_tipo_usuario = 'visitante' THEN
        SELECT id_visitante INTO v_id FROM Visitante WHERE correo_electronico = p_correo;
    ELSE
        SELECT id_gestor INTO v_id FROM Gestor WHERE correo_electronico = p_correo;
    END IF;

    IF v_id IS NOT NULL THEN
        SET token_generado = UUID();

        INSERT INTO Tokens_Recuperacion (
            id_usuario,
            token,
            tipo_usuario,
            fecha_expiracion,
            utilizado
        ) VALUES (
            v_id,
            token_generado,
            p_tipo_usuario,
            DATE_ADD(NOW(), INTERVAL 1 HOUR),
            FALSE
        );

        SELECT token_generado AS token;
    ELSE
        SELECT 'correo_no_registrado' AS error;
    END IF;
END //
DELIMITER ;
