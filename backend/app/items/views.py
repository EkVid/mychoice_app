from rest_framework import generics, viewsets
from .models import Item
from .serializers import ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
# Create your views here.


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        group = self.request.query_params.get("group")

        if group:
            queryset = queryset.filter(group=group)
        return queryset

    @action(detail=True, methods=['POST'])
    def archive(self, request, pk=None):
        item = self.get_object()
        item.archived = True
        item.save()

        serializer = ItemSerializer(item)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'])
    def rename(self, request, pk=None):
        item = self.get_object()

        serializer = ItemSerializer(
            item,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class TestAPIView(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
