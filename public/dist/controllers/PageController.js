"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PageController {
    // Renderizar la página principal (Home)
    static home(req, res) {
        res.render('home', { title: 'Agencia Digital Creativa - MOOD', page: 'home', meta_description: 'Mood: La agencia de comunicación que revoluciona el marketing. Especialistas en ATL, Digital, PR y BTL, ofrecemos soluciones para potenciar tu marca.', title_heading: 'Agencia Digital Creativa', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'video.mp4', locale: 'es_PE', imageWidth: '1200', imageHeight: '630', pageVideo: 'videos/video.mp4' });
    }
    // Renderizar la página ADN Mood
    static adnMood(req, res) {
        res.render('adn_mood', { title: 'Conóce nuestro ADN - MOOD', page: 'adn_mood', meta_description: 'Conóce la historia y cultura de nuestra agencia de comunicaciones mood con presencia en Panamá, Colombia y Perú. servicios de mktg digital, ATL y BTL.', title_heading: 'Conócenos', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'website', locale: 'es_PE', imageWidth: '1200', imageHeight: '630' });
    }
    // Renderizar la página Mood Print
    static moodPrint(req, res) {
        res.render('mood_print', { title: 'Servicios - MOOD', page: 'mood_print', meta_description: 'Descubre el poder de Mood: expertos en servicios de social media marketing, ecommerce, performance marketing, influencer marketing y más.', title_heading: 'Servicios', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'website', locale: 'es_PE', imageWidth: '1200', imageHeight: '630' });
    }
    // Renderizar la página What’s Your Mood
    static whatsYourMood(req, res) {
        res.render('whatsyourmood', { title: 'Blog, agencia creativa digital - MOOD', page: 'whatsyourmood', meta_description: 'Explora nuestro blog y descubre temas fascinantes como marketing, digital planning, inteligencia artificial, ecommerce, entre otros.', title_heading: 'Blog', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'website', locale: 'es_PE', imageWidth: '1200', imageHeight: '630' });
    }
    // Renderizar el formulario de contacto
    static contactForm(req, res) {
        res.render('contact', { title: 'Contáctanos - MOOD', page: 'contact', meta_description: 'Contáctanos a Mood, estamos aquí para ayudarte. Completa nuestro formulario de contacto y permítenos brindarte soluciones con nuestra agencia creativa', title_heading: 'Contáctanos', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'website', locale: 'es_PE', imageWidth: '1200', imageHeight: '630' });
    }
    // Renderizar la página de éxito
    static success(req, res) {
        res.render('success', { title: '¡Gracias por tu mensaje!', page: 'success' });
    }
}
exports.default = PageController;
