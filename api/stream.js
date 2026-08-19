import crypto from 'crypto';

export default function handler(req, res) {
    const secret = process.env.SECRET_NGINX || "MaSuperCleSecrete2026"; 
    const expires = Math.floor(Date.now() / 1000) + 7200; // Valide 2 heures

    // La formule ne contient plus l'URI, juste la clé et l'heure !
    const strToHash = secret + expires;
    
    let hash = crypto.createHash('md5').update(strToHash).digest('base64');
    hash = hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    // On renvoie juste le jeton pur
    const token = `?md5=${hash}&expires=${expires}`;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ token: token }); // On renvoie 'token' au lieu de 'url'
}
