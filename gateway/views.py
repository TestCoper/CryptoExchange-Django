from django.shortcuts import redirect, render, HttpResponse
from .forms import PayReqForm
from .models import Payment
import uuid
import datetime




def PayPage(request, slug):
    paydit = Payment.objects.get(addres=slug)
    return HttpResponse(paydit.Amount)
    #return render(request, 'ChatText/roomdata.html', {'room': room})


def PaymentReq(request):
    if request.method == "POST":
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        print(ip)
        data = request.POST.copy()
        data.update({'meta_pay': True})
        data.update({'payeer_pay': False})
        data.update({'userIp': ip})
        data.update({'addres': uuid.uuid4().hex})
        data.update({'PaymentStat': "pending"})
        data.update({'SendSystemStat': "WaitingPayment"})
        data.update({'AmountBack': 0.002})
        data.update({'CompString': uuid.uuid4().hex})
        data.update({'CancelString': uuid.uuid4().hex})
        data.update({'date_added_pay': datetime.datetime.now()})
        form = PayReqForm(data)
        if form.is_valid():
            form.save()
            addrPay = form.cleaned_data['addres']
            url = "/swap/pay/" + addrPay + "/"
            return redirect(url)
    else:
        pass
    return render(request, 'gateway/index.html')