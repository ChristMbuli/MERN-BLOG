// Fonction pour vérifier si un ID est valide pour MongoDB
export const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);