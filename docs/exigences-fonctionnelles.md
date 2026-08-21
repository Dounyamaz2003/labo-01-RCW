# Exigences fonctionnelles

## Gestion des clients

- Le système doit permettre d’enregistrer un client avec son nom, son courriel et son téléphone.
- Le système doit permettre de consulter les clients.
- Le système doit permettre de modifier les informations d’un client.
- Le système doit permettre de supprimer un client.
- Le courriel d’un client doit être unique.

## Gestion du matériel

- Le système doit permettre d’ajouter du matériel avec un nom, une catégorie, un prix quotidien et une quantité disponible.
- Le système doit permettre de consulter le matériel.
- Le système doit permettre de modifier le matériel.
- Le système doit permettre de supprimer le matériel.
- Le système doit assurer le suivi de la quantité disponible du matériel.

## Gestion des réservations

- Le système doit permettre de créer une réservation en sélectionnant un client, un matériel, une quantité, une date de début et une date de fin.
- Le système doit vérifier que le client existe.
- Le système doit vérifier que le matériel existe.
- Le système doit vérifier que la quantité demandée est disponible.
- Une réservation ne doit pas être acceptée lorsque la quantité demandée est inférieure à 1.
- Une réservation ne doit pas être acceptée lorsque la date de fin précède la date de début.
- Lorsqu’une réservation est confirmée, la quantité disponible du matériel doit diminuer.
- Lorsqu’une réservation est annulée, la quantité réservée doit être remise dans l’inventaire.
- Le système doit calculer le prix total selon le nombre de jours, incluant le premier et le dernier jour, multiplié par la quantité et par le prix quotidien.
- Le système doit permettre de consulter les réservations.
- Le système doit permettre d’annuler une réservation.

## Gestion des notifications

- Le système doit créer une notification après la confirmation d’une réservation.
- Le système doit créer une notification après l’annulation d’une réservation.
- Les notifications doivent être enregistrées dans la base de données.
- Le système doit permettre de consulter les notifications.

## Interface

- L’application doit présenter quatre sections : clients, matériel, réservations et notifications.