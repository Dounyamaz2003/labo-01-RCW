# User Stories – Eventia Location

## Gestion des clients

### User Story 1 – Ajouter un client

En tant qu’employé, je veux enregistrer un client afin de conserver ses informations dans le système.

Critères d’acceptation :
- Le nom, le courriel et le téléphone doivent être fournis.
- Le courriel doit être unique.
- Le client doit être enregistré dans la base de données.

### User Story 2 – Consulter les clients

En tant qu’employé, je veux consulter les clients afin de retrouver leurs informations.

Critères d’acceptation :
- La liste des clients doit être affichée.
- Un client précis doit pouvoir être consulté.
- Si le client n’existe pas, le système doit retourner une erreur.

### User Story 3 – Modifier un client

En tant qu’employé, je veux modifier les informations d’un client afin de maintenir ses données à jour.

Critères d’acceptation :
- Le client doit exister.
- Le nom, le courriel et le téléphone peuvent être modifiés.
- Le courriel doit rester unique.

### User Story 4 – Supprimer un client

En tant qu’employé, je veux supprimer un client afin de retirer une fiche qui n’est plus nécessaire.

Critères d’acceptation :
- Le client doit exister.
- Après la suppression, le client ne doit plus apparaître dans la liste.


## Gestion du matériel

### User Story 5 – Ajouter du matériel

En tant qu’employé, je veux ajouter du matériel afin de gérer les équipements disponibles à la location.

Critères d’acceptation :
- Le nom, la catégorie, le prix quotidien et la quantité disponible doivent être fournis.
- Le matériel doit être enregistré dans la base de données.

### User Story 6 – Consulter le matériel

En tant qu’employé, je veux consulter le matériel afin de connaître les équipements disponibles.

Critères d’acceptation :
- La liste du matériel doit être affichée.
- Un matériel précis doit pouvoir être consulté.
- La quantité disponible doit être visible.

### User Story 7 – Modifier ou supprimer du matériel

En tant qu’employé, je veux modifier ou supprimer du matériel afin de maintenir l’inventaire à jour.

Critères d’acceptation :
- Le matériel doit exister.
- Ses informations doivent pouvoir être modifiées.
- Le matériel doit pouvoir être supprimé.


## Gestion des réservations

### User Story 8 – Créer une réservation

En tant qu’employé, je veux créer une réservation afin de louer du matériel à un client.

Critères d’acceptation :
- Le client doit exister.
- Le matériel doit exister.
- La quantité demandée doit être disponible.
- La quantité doit être supérieure ou égale à 1.
- La date de fin ne doit pas précéder la date de début.
- La quantité disponible du matériel doit diminuer après la confirmation.
- La réservation doit avoir le statut CONFIRMED.

### User Story 9 – Calculer le prix d’une réservation

En tant qu’employé, je veux que le prix total soit calculé automatiquement afin d’éviter les calculs manuels.

Critères d’acceptation :
- Le premier et le dernier jour doivent être inclus dans le nombre de jours.
- Le prix total doit être égal au nombre de jours multiplié par la quantité et par le prix quotidien.

### User Story 10 – Consulter les réservations

En tant qu’employé, je veux consulter les réservations afin de suivre les locations.

Critères d’acceptation :
- La liste des réservations doit être affichée.
- Les informations du client et du matériel doivent être présentes.
- Le prix total et le statut doivent être affichés.

### User Story 11 – Annuler une réservation

En tant qu’employé, je veux annuler une réservation afin de remettre le matériel dans l’inventaire.

Critères d’acceptation :
- La réservation doit exister.
- Son statut doit devenir CANCELLED.
- La quantité réservée doit être remise dans l’inventaire.


## Gestion des notifications

### User Story 12 – Créer une notification

En tant qu’employé, je veux qu’une notification soit conservée après une confirmation ou une annulation afin de garder une trace de l’opération.

Critères d’acceptation :
- Une notification doit être créée après la confirmation d’une réservation.
- Une notification doit être créée après l’annulation d’une réservation.
- La notification doit être enregistrée dans la base de données.
- Aucun vrai courriel ne doit être envoyé.

### User Story 13 – Consulter les notifications

En tant qu’employé, je veux consulter les notifications afin de voir l’historique des opérations.

Critères d’acceptation :
- Les notifications doivent être affichées.
- Les notifications doivent être présentées de la plus récente à la plus ancienne.