-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-03-2016 a las 16:31:39
-- Versión del servidor: 5.6.11
-- Versión de PHP: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `universidades`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `universidades`
--

CREATE TABLE IF NOT EXISTS `universidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `ciudad` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=29 ;

--
-- Volcado de datos para la tabla `universidades`
--

INSERT INTO `universidades` (`id`, `nombre`, `ciudad`) VALUES
(1, 'Alfonso El Sabio', 'Madrid'),
(2, 'Alicante', 'Alicante'),
(3, 'AlmerÃ­a', 'Almeria'),
(4, 'Antonio de Nebrija', 'Madrid'),
(5, 'Barcelona', 'Barcelona'),
(6, 'Burgos', 'Burgos'),
(7, 'Cantabria', 'Santander'),
(8, 'Cardenal Herrera-CEU', 'Valencia'),
(9, 'Carlos III de Madrid', 'Madrid'),
(10, 'Castilla-La Mancha', 'Ciudad Real'),
(11, 'Deusto', 'Bilbao'),
(12, 'Europea de Madrid', 'Madrid'),
(13, 'Europea Miguel de Cervantes', 'Valladolid'),
(14, 'Extremadura', 'Badajoz'),
(15, 'Francisco de Vitoria', 'Madrid'),
(16, 'Girona', 'Girona'),
(17, 'Granada', 'Granada'),
(18, 'Huelva', 'Huelva'),
(19, 'IE Universidad', 'Segovia'),
(20, 'Illes Balears', 'Palma'),
(22, 'Internacional de Catalunya', 'Barcelona'),
(23, 'Internacional Isabel I de Castilla', ''),
(24, 'Internacional Valenciana', ''),
(25, 'La Laguna', 'Tenerife'),
(26, 'Las Palmas de Gran Canaria', 'Las Palmas'),
(27, 'Lleida', 'Lleida'),
(28, 'Vigo', 'Vigo');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
