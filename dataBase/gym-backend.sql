-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2026 a las 01:36:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gym-backend`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `birth_date` date NOT NULL,
  `registration_date` date NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id`, `full_name`, `dni`, `phone`, `birth_date`, `registration_date`, `active`) VALUES
(2, 'Name con relacion', '5314863', '2346555555', '2000-12-26', '2026-06-15', 1),
(3, 'Name con relacion', '12345678', '12354879', '2000-12-26', '2026-06-15', 1),
(5, 'fadfasd', '21154465', '4564654', '2000-12-26', '2026-04-26', 1),
(6, 'asdd', 'd4565das5d6', '56', '0002-03-31', '6532-02-23', 1),
(7, 'dasdas5d6', 'dasdasdas', '', '2026-06-17', '2026-06-24', 1),
(8, 'sadlmasñdkllñk', '565542131', '', '2222-02-22', '2222-02-22', 1),
(9, 'dsasd54as4', '454651231', '', '1111-02-11', '1111-11-11', 1),
(10, '12as1d2a1sd', '12125454', '', '1111-11-11', '1111-11-11', 1),
(11, '2sd12a1d2', '212545', '', '1111-11-11', '1111-11-11', 1),
(12, '111111', '121da21sa2d', '', '1111-11-11', '1111-11-11', 1),
(13, '11111', '1111111', '', '1111-11-11', '1111-11-11', 1),
(14, 'a', '522222', '1', '1111-11-11', '1111-11-11', 1),
(15, '1231456', '23124231324', '', '1111-11-11', '1111-11-11', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `news`
--

CREATE TABLE `news` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` text NOT NULL,
  `expiration_date` datetime(6) NOT NULL,
  `publication_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `news`
--

INSERT INTO `news` (`id`, `created_at`, `description`, `expiration_date`, `publication_date`) VALUES
(2, '2026-06-21 00:19:52.000000', 'description actualizada en el front\n', '2026-07-05 22:31:00.000000', '2026-06-28 22:31:00.000000'),
(3, '2026-06-21 01:33:27.000000', 'Noticia Programada', '2027-01-26 00:14:00.000000', '2026-12-27 00:14:00.000000'),
(5, '2026-06-28 16:57:04.000000', 'noticia creada en el Front', '2026-06-29 22:57:00.000000', '2026-06-28 22:57:00.000000'),
(6, '2026-06-28 21:17:59.000000', 'Soy una noticia creada desde la pantalla privada', '2026-07-06 01:08:00.000000', '2026-06-29 01:08:00.000000'),
(7, '2026-06-28 22:08:19.000000', 'Soy otra noticia', '2026-07-05 22:08:19.000000', '2026-06-28 22:08:19.000000'),
(8, '2026-06-28 22:09:26.000000', 'Profesor incorporado a nuestro equipo:\nGoku', '2026-07-05 22:09:26.000000', '2026-06-28 22:09:26.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` datetime NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `customer_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `payments`
--

INSERT INTO `payments` (`id`, `amount`, `payment_date`, `payment_method`, `payment_status`, `description`, `customer_id`) VALUES
(1, 1235.87, '2026-06-18 01:09:00', 'CASH', 'APPROVED', 'pago de prueba', 0),
(3, 123456.79, '2026-06-18 01:27:00', 'CASH', 'APPROVED', '', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `auth_provider` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'PROFESOR'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `auth_provider`, `role`) VALUES
(46, 'Alexandro', 'alexaquino261200@gmail.com', '$2a$10$heQslejX5oUAGC9GqEoTLe6I23Uv0MEZJA4XIYcgYQRanyAQfnRBe', 'GOOGLE', 'PROFESOR'),
(47, 'Alex Aquino', 'alexaquino001226@gmail.com', NULL, 'GOOGLE', 'PROFESOR'),
(48, 'Admin', 'admin@gmail.com', '$2a$10$ns0hqEaNc0RgoT8xKg0zSujS3NL8tWYhJeQ1irFKYor7PTO0tMzo.', 'LOCAL', 'ADMIN'),
(49, 'Agustin', 'adawd@gmail.com', '$2a$10$QvR3nen6iMfpSCorvL8rrONCO267G3.f2.nlFlQu1YzigLOulY.yO', 'LOCAL', 'ADMIN'),
(50, 'agustinficha123', 'agustin@agustin.com', '$2a$10$y7NAkkRLHScNROQ8S655W.bZ.a.z90nUj1NAZa7rKPi89OuHSp1QG', 'LOCAL', 'ADMIN'),
(51, 'Usuario1', 'usuario1@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'ADMIN'),
(52, 'Usuario2', 'usuario2@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'PROFESOR'),
(53, 'Usuario3', 'usuario3@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'PROFESOR'),
(54, 'Usuario4', 'usuario4@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'PROFESOR'),
(55, 'Usuario5', 'usuario5@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'PROFESOR'),
(56, 'Usuario6', 'usuario6@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'PROFESOR'),
(57, 'Usuario7', 'usuario7@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'PROFESOR'),
(58, 'Usuario8', 'usuario8@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'PROFESOR'),
(59, 'Usuario9', 'usuario9@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'PROFESOR'),
(60, 'Usuario10', 'usuario10@gmail.com', '$2a$10$f3N9YcWSiK/k0pQ8tP6o0O4B7m.YFh8uXl8CmsN2UvI1R/vIuDq6O', 'LOCAL', 'PROFESOR'),
(61, 'agustin44', 'agustin1@gmail.com', '$2a$10$8o3.CSYWE/Ic221xfluAq.BFNcbZd3kmapqOxxLRZ2/H/7RQpfzDG', 'LOCAL', 'ADMIN');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
