
#### calculation de metals (MAD/gram)
- `data.silver_usd_oz` : prix de l'argent en dollars américains par once troy (USD/oz).
- `data.fx_rate` : taux de conversion USD vers MAD (1$ ≈ 10 MAD).
- 1 once troy = 31,1035 grammes.

#### endpoints

1. https://xaus.com/api/v1/spot?currency=MAD&unit=gram
   - `/spot` retourne les cours actuels ou les dernières valeurs disponibles du marché.
   - `currency=MAD` : devise en dirhams.
   - `unit=gram` : prix par gramme.

2. https://xaus.com/api/v1/chart
   - exemple de query : `symbol=xau&range=5d&interval=1d`
   - retourne l'historique des prix sur 5 jours, avec un point par jour.
   - chaque point contient :
     - `t` : date (moment où le prix a été relevé).
     - `h` : prix maximum pendant la journée.
     - `l` : prix minimum pendant la journée.
     - `o` : prix d'ouverture (prix de l'or au début de la journée).
     - `c` : prix de clôture (prix de l'or à la fin de la journée).
     - `v` : volume (quantité échangée pendant une période donnée).

on va comparer les cours actuels de l'or et de l'argent avec leurs cours précédents pour calculer leur variation en MAD/gramme