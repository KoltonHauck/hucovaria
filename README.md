# HuCOVarIa

## To Populate the DB
1. Comment urlpatterns list in main/urls.py file. Uncomment empty urlpatterns list.
2. Comment out all code after imports in main/views.py file. ( Everything after 'from .models import *' should be commented out.)
3. Run 'python manage.py migrate' to apply migrations.
4. Reverse changes in 1. and 2. (Revert urlpatterns from empty to non-empty list in main/urls.py and uncomment all functions in main/views.py)
