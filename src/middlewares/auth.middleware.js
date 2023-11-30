import Jwt from 'jsonwebtoken';

const authentification =
  ({ authRequired = true }) =>
  (req, res, next) => {
    /**
     * Si l'authentification est requise et que l'utilisateur n'a pas fourni de token
     */
    if (authRequired && !req.headers.authorization) {
      res.status(401).send({ message: 'MISSING_TOKEN' });
    }

    /**
     * Si l'authentification n'est pas requise et que l'utilisateur n'a pas fourni de token, on accepte la requête
     */
    if (!authRequired && !req.headers.authorization) {
      next();
    }

    /**
     * Si l'authentification est requise et que l'utilisateur a fourni un token, on vérifie que le token est valide
     */
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      const jwt = req.headers.authorization.split(' ')[1]; // on découpe la string en 2 parties, à partir du premier espace, puis on selectionne directement la 2ème partie découpée

      try {
        const verifiedJWT = Jwt.verify(jwt, process.env.JWT_SECRET); // on vérifie que le JWT est valide et n'a pas été modifié

        // on attache les données du JWT décryptées à la requête, pour pouvoir l'utiliser dans nos routes
        req.user = {
          id: verifiedJWT.id,
        };

        next();
      } catch (jwtVerificationError) {
        // si le JWT n'est pas valide, on renvoie une erreur
        res.status(401).json({ message: 'INVALID_TOKEN' });
      }
    }
  };
export default authentification;
