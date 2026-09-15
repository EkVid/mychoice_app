from django.urls import path, include
from .views import ItemViewSet
from rest_framework.routers import DefaultRouter

# urlpatterns = [
#     path("items/", ItemCreateView.as_view(), name="item-create"),
#     path("items/<int:pk>/", ItemDetailView.as_view(), name="item-detail"),
#     path("items/<int:pk>/archive", ItemArchiveView.as_view(), name="item-archive"),
# ]

router = DefaultRouter()
router.register("items", ItemViewSet)

urlpatterns = [
    path("", include(router.urls))
]
