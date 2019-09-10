CREATE TABLE `clientes` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(45) NOT NULL DEFAULT '',
  `direccion` VARCHAR(45) NOT NULL DEFAULT '',
  `telefono` VARCHAR(10) NOT NULL DEFAULT '',
  `email` VARCHAR(45) NOT NULL DEFAULT '',
  PRIMARY KEY(`id`)
)
ENGINE = InnoDB;

INSERT INTO clientes (nombres, direccion, telefono, email) VALUES
('Victor Jimenez','Av Union 234','45752256','victor_j@latin.com'),
('Ivan Fernandez','Belgrano 4564','32900536','fernivan@surper.net'),
('Carlos Salazar','Peru 878','45784568','salazar_234@minerva.viz'),
('Ever Mendez','Av Independencia 1258','22058566','webmaster@yaohi.com.pe'),
('Juan Linares','Pj El Maestro 2','965456348','gutiman@coolmain.ru'),
('Julio Gutierrez','Andonaegui 984','978451268','juliter@menzat.nu.pe'),
('Manuel Villalobos','Av Cordoba 8282','22057834','manu@latin.es');